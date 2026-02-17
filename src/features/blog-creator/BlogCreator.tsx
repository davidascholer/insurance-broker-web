import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { GripVertical, Trash2, Eye, X, Edit } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { getBlogByName } from "@/api/admin/blog";

// Import types
import type { ModalState } from "./utils/types";
import type { InternalComponentItem } from "./utils/internal-types";
import type { InnerTextType } from "./utils/export-types";

// Import components
import { RichTextEditor } from "./components/RichTextEditor";
import { ConfirmModal } from "./components/ConfirmModal";
import { EditModal } from "./components/EditModal";

// Import configuration
import {
  ALL_LABELS,
  sectionContainerComponents,
  availableComponents,
} from "./config/components";

// Import utilities
import {
  validatePageName,
  validateBlogMetadata,
  convertFromSaved,
} from "./utils/helpers";
import RenderedComponent from "./components/RenderedComponent";
import { internalToExport } from "./utils/helpers";
import { savePage as savePageApi } from "./api/blogApi";

const BlogCreator = () => {
  useRequireAuth();
  const { pageName: urlPageName } = useParams<{ pageName: string }>();
  const [components, setComponents] = useState<InternalComponentItem[]>([]);
  const [pageName, setPageName] = useState("");

  // Blog metadata fields
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogDate, setBlogDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [blogImageUrl, setBlogImageUrl] = useState("https://picsum.photos/200");
  const [blogLabels, setBlogLabels] = useState<string[]>([]);
  const [labelsDropdownOpen, setLabelsDropdownOpen] = useState(false);
  const labelsDropdownRef = useRef<HTMLDivElement>(null!);

  // Load page data from server if editing existing page
  useEffect(() => {
    const loadBlogData = async () => {
      if (urlPageName) {
        setPageName(urlPageName);

        try {
          const token = localStorage.getItem("pipaAdminAccessToken") || "";
          const result = await getBlogByName(urlPageName, token);

          if (result.success && result.data) {
            const blog = result.data;
            const loadedComponents = convertFromSaved(blog.components);
            setComponents(loadedComponents);

            // Load blog card data
            setBlogTitle(blog.card.title);
            setBlogDescription(blog.card.description);
            setBlogDate(blog.card.date);
            setBlogImageUrl(
              blog.card.imageURLs[0] || "https://picsum.photos/200",
            );
            setBlogLabels(blog.card.labels);
          }
        } catch (error) {
          console.error("Error loading blog:", error);
        }
      }
    };

    loadBlogData();
  }, [urlPageName]);

  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedFromContainer, setDraggedFromContainer] = useState<
    string | null
  >(null);
  const [isDraggingSectionContainer, setIsDraggingSectionContainer] =
    useState(false);
  const [isInvalidDropTarget, setIsInvalidDropTarget] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingComponent, setEditingComponent] =
    useState<InternalComponentItem | null>(null);
  const [originalEditingComponent, setOriginalEditingComponent] =
    useState<InternalComponentItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingParentId, setEditingParentId] = useState<string | null>(null);
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const fontDropdownRef = useRef<HTMLDivElement>(null!);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const colorDropdownRef = useRef<HTMLDivElement>(null!);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [pageSaved, setPageSaved] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: "confirm",
    title: "",
    message: "",
    inputValue: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  useOutsideClick(fontDropdownRef, () => setFontDropdownOpen(false));
  useOutsideClick(labelsDropdownRef, () => setLabelsDropdownOpen(false));
  useOutsideClick(colorDropdownRef, () => setColorDropdownOpen(false));

  // Re-enable save button when page content changes
  const [lastSavedState, setLastSavedState] = useState("");
  const currentState = JSON.stringify({ pageName, components });
  if (pageSaved && currentState !== lastSavedState) {
    setPageSaved(false);
  }
  if (pageSaved && lastSavedState === "") {
    setLastSavedState(currentState);
  }

  const handleDragStart = (
    type: string,
    e: React.DragEvent,
    isContainer = false,
  ) => {
    e.dataTransfer.effectAllowed = "copy";
    setDraggedComponent(type);
    setIsDraggingSectionContainer(isContainer);
  };

  const handleDragStartCanvas = (
    index: number,
    e: React.DragEvent,
    containerId?: string,
    isContainer = false,
  ) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggedIndex(index);
    setDraggedFromContainer(containerId || null);
    setIsDraggingSectionContainer(isContainer);
  };

  const handleDragOver = (e: React.DragEvent, targetContainerId?: string) => {
    e.preventDefault();

    // Check if this is an invalid drop target
    const isInvalid =
      // Case 1: Section Container being dragged into another container
      (targetContainerId && isDraggingSectionContainer) ||
      // Case 2: Regular component being dragged onto canvas (not into a container)
      (!targetContainerId && !isDraggingSectionContainer);

    setIsInvalidDropTarget(isInvalid);

    if (isInvalid) {
      e.dataTransfer.dropEffect = "none";
    } else {
      e.dataTransfer.dropEffect = draggedIndex !== null ? "move" : "copy";
    }
  };

  const handleDragEnd = () => {
    setIsInvalidDropTarget(false);
  };

  const handleDrop = (
    e: React.DragEvent,
    dropIndex?: number,
    targetContainerId?: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Only Section Containers can be dropped on the main canvas
    if (!targetContainerId && !isDraggingSectionContainer) {
      setDraggedComponent(null);
      setDraggedIndex(null);
      setDraggedFromContainer(null);
      setIsDraggingSectionContainer(false);
      setIsInvalidDropTarget(false);
      return;
    }

    // Section Containers cannot be dropped inside other containers
    if (targetContainerId && isDraggingSectionContainer) {
      setDraggedComponent(null);
      setDraggedIndex(null);
      setIsInvalidDropTarget(false);
      setDraggedFromContainer(null);
      setIsDraggingSectionContainer(false);
      return;
    }

    if (draggedComponent) {
      // Dropping from palette
      const allComponents = isDraggingSectionContainer
        ? sectionContainerComponents
        : availableComponents;
      const component = allComponents.find((c) => c.type === draggedComponent);
      if (!component) return;

      const newComponent: InternalComponentItem = {
        id: `${component.type}-${Date.now()}`,
        type: component.type as InternalComponentItem["type"],
        name: component.name,
        props: { ...component.defaultProps },
        ...(isDraggingSectionContainer && { children: [] }),
      };

      if (targetContainerId) {
        // Drop into a container
        const newComponents = [...components];
        const containerIndex = newComponents.findIndex(
          (c) => c.id === targetContainerId,
        );
        if (containerIndex >= 0 && newComponents[containerIndex].children) {
          if (dropIndex !== undefined) {
            newComponents[containerIndex].children!.splice(
              dropIndex,
              0,
              newComponent,
            );
          } else {
            newComponents[containerIndex].children!.push(newComponent);
          }
          setComponents(newComponents);
        }
      } else {
        // Drop on main canvas (only Section Containers)
        if (dropIndex !== undefined) {
          const newComponents = [...components];
          newComponents.splice(dropIndex, 0, newComponent);
          setComponents(newComponents);
        } else {
          setComponents([...components, newComponent]);
        }
      }
    } else if (draggedIndex !== null) {
      // Reordering/moving existing components
      if (
        draggedFromContainer &&
        targetContainerId &&
        draggedFromContainer === targetContainerId
      ) {
        // Reordering within the same container
        const newComponents = [...components];
        const containerIndex = newComponents.findIndex(
          (c) => c.id === targetContainerId,
        );
        if (
          containerIndex >= 0 &&
          newComponents[containerIndex].children &&
          dropIndex !== undefined
        ) {
          const children = [...newComponents[containerIndex].children!];
          const [removed] = children.splice(draggedIndex, 1);
          children.splice(dropIndex, 0, removed);
          newComponents[containerIndex].children = children;
          setComponents(newComponents);
        }
      } else if (!draggedFromContainer && !targetContainerId) {
        // Reordering Section Containers on main canvas
        if (dropIndex !== undefined) {
          const newComponents = [...components];
          const [removed] = newComponents.splice(draggedIndex, 1);
          newComponents.splice(dropIndex, 0, removed);
          setComponents(newComponents);
        }
      } else if (
        draggedFromContainer &&
        targetContainerId &&
        draggedFromContainer !== targetContainerId
      ) {
        // Moving between containers
        const newComponents = [...components];
        const sourceIndex = newComponents.findIndex(
          (c) => c.id === draggedFromContainer,
        );
        const targetIndex = newComponents.findIndex(
          (c) => c.id === targetContainerId,
        );

        if (
          sourceIndex >= 0 &&
          targetIndex >= 0 &&
          newComponents[sourceIndex].children &&
          newComponents[targetIndex].children
        ) {
          const sourceChildren = [...newComponents[sourceIndex].children!];
          const [removed] = sourceChildren.splice(draggedIndex, 1);
          newComponents[sourceIndex].children = sourceChildren;

          if (dropIndex !== undefined) {
            newComponents[targetIndex].children!.splice(dropIndex, 0, removed);
          } else {
            newComponents[targetIndex].children!.push(removed);
          }
          setComponents(newComponents);
        }
      } else if (draggedFromContainer && !targetContainerId) {
        // Cannot move regular components to main canvas
        setDraggedComponent(null);
        setDraggedIndex(null);
        setDraggedFromContainer(null);
        setIsDraggingSectionContainer(false);
        return;
      }
    }

    setDraggedComponent(null);
    setDraggedIndex(null);
    setDraggedFromContainer(null);
    setIsDraggingSectionContainer(false);
  };

  const handleDelete = (id: string) => {
    const component = components.find((c) => c.id === id);
    const componentName = component?.name || "this component";

    setModalState({
      isOpen: true,
      type: "confirm",
      title: "Delete Component",
      message: `Are you sure you want to delete ${componentName}?`,
      inputValue: "",
      onConfirm: () => {
        setComponents(components.filter((c) => c.id !== id));
        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
      onCancel: () => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleEdit = (
    component: InternalComponentItem,
    index: number,
    parentId?: string,
  ) => {
    const componentCopy = JSON.parse(JSON.stringify(component));
    setEditingComponent(componentCopy);
    setOriginalEditingComponent(componentCopy);
    setEditingIndex(index);
    setEditingParentId(parentId || null);
  };

  const handleSaveEdit = () => {
    if (editingComponent && editingIndex !== null) {
      const newComponents = [...components];

      if (editingParentId) {
        // Editing a child component - save it back to its parent container
        const parentIndex = newComponents.findIndex(
          (c) => c.id === editingParentId,
        );
        if (parentIndex >= 0 && newComponents[parentIndex].children) {
          newComponents[parentIndex].children![editingIndex] = editingComponent;
        }
      } else {
        // Editing a root-level component
        newComponents[editingIndex] = editingComponent;
      }

      setComponents(newComponents);
      setEditingComponent(null);
      setOriginalEditingComponent(null);
      setEditingIndex(null);
      setEditingParentId(null);

      // Save to server
      savePageApi({
        pageName,
        components: newComponents,
        blogTitle,
        blogDescription,
        blogDate,
        blogImageUrl,
        blogLabels,
      }).then((result) => {
        if (result.success) {
          setPageSaved(true);
          setToastMessage("Page saved successfully");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        } else {
          setPageSaved(false);
          setToastMessage("Failed to save page");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          console.error("Failed to save:", result.message);
        }
      });
    }
  };

  const handleCancelEdit = () => {
    // Check if changes were made
    const hasChanges =
      editingComponent &&
      originalEditingComponent &&
      JSON.stringify(editingComponent) !==
        JSON.stringify(originalEditingComponent);

    if (hasChanges) {
      setModalState({
        isOpen: true,
        type: "confirm",
        title: "Discard Changes?",
        message:
          "You have unsaved changes. Are you sure you want to cancel? All changes will be lost.",
        inputValue: "",
        onConfirm: () => {
          setEditingComponent(null);
          setOriginalEditingComponent(null);
          setEditingIndex(null);
          setEditingParentId(null);
          setModalState((prev) => ({ ...prev, isOpen: false }));
        },
        onCancel: () => {
          setModalState((prev) => ({ ...prev, isOpen: false }));
        },
      });
    } else {
      setEditingComponent(null);
      setOriginalEditingComponent(null);
      setEditingIndex(null);
      setEditingParentId(null);
    }
  };

  const updateProp = (key: string, value: unknown) => {
    if (editingComponent) {
      setEditingComponent({
        ...editingComponent,
        props: {
          ...editingComponent.props,
          [key]: value,
        },
      });
    }
  };

  const renderPropEditor = (key: string, value: unknown) => {
    // Special handling for InnerText content editor
    if (key === "content" && editingComponent?.type === "InnerText") {
      return (
        <RichTextEditor
          value={value as string}
          onChange={(newValue) => updateProp(key, newValue)}
          editingComponent={editingComponent}
          onFontFamilyChange={(fontFamily) =>
            updateProp("fontFamily", fontFamily)
          }
        />
      );
    }

    // Special handling for PartnerHeader description (InnerTextType)
    if (key === "description" && editingComponent?.type === "PartnerHeader") {
      const innerTextValue = value as InnerTextType;
      return (
        <RichTextEditor
          value={innerTextValue.content || "<p>Enter description</p>"}
          onChange={(newContent) => {
            updateProp(key, {
              ...innerTextValue,
              content: newContent,
            });
          }}
          editingComponent={editingComponent}
          onFontFamilyChange={(fontFamily) => {
            updateProp(key, {
              ...innerTextValue,
              fontFamily,
            });
          }}
        />
      );
    }

    // Special handling for HeaderWithText description (InnerTextType)
    if (key === "description" && editingComponent?.type === "HeaderWithText") {
      const innerTextValue = value as InnerTextType;
      return (
        <RichTextEditor
          value={innerTextValue.content || "<p>Enter description</p>"}
          onChange={(newContent) => {
            updateProp(key, {
              ...innerTextValue,
              content: newContent,
            });
          }}
          editingComponent={editingComponent}
          onFontFamilyChange={(fontFamily) => {
            updateProp(key, {
              ...innerTextValue,
              fontFamily,
            });
          }}
        />
      );
    }

    // Special handling for PartnerFooter reviewContent (InnerTextType)
    if (key === "reviewContent" && editingComponent?.type === "PartnerFooter") {
      const innerTextValue = value as InnerTextType;
      return (
        <RichTextEditor
          value={innerTextValue.content || "<p>Enter review content</p>"}
          onChange={(newContent) => {
            updateProp(key, {
              ...innerTextValue,
              content: newContent,
            });
          }}
          editingComponent={editingComponent}
          onFontFamilyChange={(fontFamily) => {
            updateProp(key, {
              ...innerTextValue,
              fontFamily,
            });
          }}
        />
      );
    }

    // Special handling for ContentWithImage content (InnerTextType)
    if (key === "content" && editingComponent?.type === "ContentWithImage") {
      const innerTextValue = value as InnerTextType;
      return (
        <RichTextEditor
          value={innerTextValue.content || "<p>Enter content</p>"}
          onChange={(newContent) => {
            updateProp(key, {
              ...innerTextValue,
              content: newContent,
            });
          }}
          editingComponent={editingComponent}
          onFontFamilyChange={(fontFamily) => {
            updateProp(key, {
              ...innerTextValue,
              fontFamily,
            });
          }}
        />
      );
    }

    // Special handling for ContentUnorderedList listItems (Array<InnerTextType>)
    if (
      key === "listItems" &&
      editingComponent?.type === "ContentUnorderedList" &&
      Array.isArray(value)
    ) {
      const items = value as InnerTextType[];

      const addItem = () => {
        const newItems = [
          ...items,
          {
            content: "<p>New list item</p>",
            fontFamily: "nunito-sans",
          },
        ];
        updateProp(key, newItems);
      };

      const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        updateProp(key, newItems);
      };

      const updateItem = (
        index: number,
        field: keyof InnerTextType,
        newValue: unknown,
      ) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: newValue };
        updateProp(key, newItems);
      };

      return (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-lg space-y-2 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-(--primary-teal-dark)">
                  Item {index + 1}
                </span>
                <button
                  onClick={() => removeItem(index)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Content (Rich Text)
                </label>
                <div className="border border-gray-200 rounded p-2 bg-white">
                  <RichTextEditor
                    value={item.content || "<p>Enter content</p>"}
                    editingComponent={null}
                    onChange={(newContent) => {
                      updateItem(index, "content", newContent);
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Font Family
                </label>
                <select
                  value={item.fontFamily || "nunito-sans"}
                  onChange={(e) => {
                    updateItem(index, "fontFamily", e.target.value);
                  }}
                  className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-(--primary-teal)"
                >
                  <option value="nunito-sans">Nunito Sans</option>
                  <option value="nunito-sans-light">Nunito Sans Light</option>
                  <option value="nunito-sans-medium">Nunito Sans Medium</option>
                  <option value="nunito-sans-semibold">
                    Nunito Sans SemiBold
                  </option>
                  <option value="nunito-sans-bold">Nunito Sans Bold</option>
                  <option value="sansita-regular">Sansita Regular</option>
                  <option value="sansita-bold">Sansita Bold</option>
                  <option value="sansita-extrabold">Sansita Extra Bold</option>
                  <option value="sansita-black">Sansita Black</option>
                </select>
              </div>
            </div>
          ))}
          <button
            onClick={addItem}
            className="w-full px-4 py-2 border-2 border-dashed border-(--primary-teal) text-(--primary-teal) rounded-lg hover:bg-(--light-pink) transition-colors font-semibold"
          >
            + Add Item
          </button>
        </div>
      );
    }

    // Special handling for imageListItems
    if (key === "imageListItems" && Array.isArray(value)) {
      const items = value as Array<{
        imageUrl: string;
        imageAlt?: string;
        children: React.ReactNode;
        className?: string;
      }>;

      const addItem = () => {
        const newItems = [
          ...items,
          {
            imageUrl: "/backgrounds/cats_dogs_photo_3x2.webp",
            imageAlt: "New Image",
            children: {
              type: "ContentText",
              props: {
                content: "New item description",
                fontFamily: "nunito-sans",
              },
            },
          },
        ];
        updateProp(key, newItems);
      };

      const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        updateProp(key, newItems);
      };

      const updateItem = (index: number, field: string, newValue: unknown) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: newValue };
        updateProp(key, newItems);
      };

      return (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-lg space-y-2 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-(--primary-teal-dark)">
                  Item {index + 1}
                </span>
                <button
                  onClick={() => removeItem(index)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={item.imageUrl || ""}
                  onChange={(e) =>
                    updateItem(index, "imageUrl", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:border-(--primary-teal) focus:outline-none"
                  placeholder="/path/to/image.jpg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={item.imageAlt || ""}
                  onChange={(e) =>
                    updateItem(index, "imageAlt", e.target.value)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:border-(--primary-teal) focus:outline-none"
                  placeholder="Image description"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Description (Rich Text)
                </label>
                {typeof item.children === "object" &&
                item.children !== null &&
                (item.children as { type?: string }).type === "ContentText" ? (
                  <div className="border border-gray-200 rounded p-2 bg-white">
                    <RichTextEditor
                      value={
                        (
                          item.children as {
                            type: string;
                            props: { content?: string };
                          }
                        ).props?.content || ""
                      }
                      editingComponent={null}
                      onChange={(newContent) => {
                        const updatedChild = {
                          type: "ContentText",
                          props: {
                            ...(
                              item.children as {
                                type: string;
                                props: { [key: string]: unknown };
                              }
                            ).props,
                            content: newContent,
                          },
                        };
                        updateItem(index, "children", updatedChild);
                      }}
                    />
                    <div className="mt-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Font Family
                      </label>
                      <select
                        value={
                          typeof item.children === "object" &&
                          item.children !== null &&
                          "props" in item.children
                            ? ((
                                item.children as {
                                  props?: { fontFamily?: string };
                                }
                              ).props?.fontFamily as string) || "nunito-sans"
                            : "nunito-sans"
                        }
                        onChange={(e) => {
                          const updatedChild = {
                            type: "ContentText",
                            props: {
                              ...(
                                item.children as {
                                  type: string;
                                  props: { [key: string]: unknown };
                                }
                              ).props,
                              fontFamily: e.target.value,
                            },
                          };
                          updateItem(index, "children", updatedChild);
                        }}
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-(--primary-teal)"
                      >
                        <option value="nunito-sans">Nunito Sans</option>
                        <option value="nunito-sans-light">
                          Nunito Sans Light
                        </option>
                        <option value="nunito-sans-medium">
                          Nunito Sans Medium
                        </option>
                        <option value="nunito-sans-semibold">
                          Nunito Sans SemiBold
                        </option>
                        <option value="nunito-sans-bold">
                          Nunito Sans Bold
                        </option>
                        <option value="sansita-regular">Sansita Regular</option>
                        <option value="sansita-bold">Sansita Bold</option>
                        <option value="sansita-extrabold">
                          Sansita Extra Bold
                        </option>
                        <option value="sansita-black">Sansita Black</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <textarea
                    value={String(item.children || "")}
                    onChange={(e) => {
                      const newChild = {
                        type: "ContentText",
                        props: {
                          content: e.target.value,
                          fontFamily: "nunito-sans",
                        },
                      };
                      updateItem(index, "children", newChild);
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:border-(--primary-teal) focus:outline-none resize-vertical"
                    rows={2}
                    placeholder="Item description"
                  />
                )}
              </div>
            </div>
          ))}

          <button
            onClick={addItem}
            className="w-full px-4 py-2 border-2 border-dashed border-(--primary-teal) text-(--primary-teal) rounded-lg hover:bg-(--light-pink) transition-colors font-semibold"
          >
            + Add Item
          </button>
        </div>
      );
    }

    // Handle different prop types
    if (key === "children" && typeof value === "object" && value !== null) {
      return (
        <textarea
          value={(value as { toString(): string }).toString()}
          onChange={(e) => updateProp(key, e.target.value)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none resize-vertical min-h-[100px] font-mono text-sm"
          placeholder="Enter content"
        />
      );
    }

    // Special handling for reviewStars (0-5.0, one decimal place)
    if (key === "reviewStars" && editingComponent?.type === "PartnerHeader") {
      return (
        <input
          type="number"
          min="0"
          max="5.0"
          step="0.1"
          value={value as number}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val) && val >= 0 && val <= 5.0) {
              updateProp(key, Math.round(val * 10) / 10);
            }
          }}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
        />
      );
    }

    // Special handling for reviewCount (whole number > 0)
    if (key === "reviewCount" && editingComponent?.type === "PartnerHeader") {
      return (
        <input
          type="number"
          min="1"
          step="1"
          value={value as number}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val > 0) {
              updateProp(key, val);
            }
          }}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
        />
      );
    }

    if (typeof value === "number") {
      return (
        <input
          type="number"
          step="0.1"
          value={value as number}
          onChange={(e) => updateProp(key, parseFloat(e.target.value))}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
        />
      );
    }

    // Special handling for fontFamily prop in InnerText
    if (key === "fontFamily" && editingComponent?.type === "InnerText") {
      const fontFamilyOptions = [
        {
          label: "Nunito Sans",
          value: "nunito-sans",
          fontFamily: '"Nunito Sans", sans-serif',
          fontWeight: 400,
        },
        {
          label: "Nunito Sans Light",
          value: "nunito-sans-light",
          fontFamily: '"Nunito Sans", sans-serif',
          fontWeight: 300,
        },
        {
          label: "Nunito Sans Medium",
          value: "nunito-sans-medium",
          fontFamily: '"Nunito Sans", sans-serif',
          fontWeight: 500,
        },
        {
          label: "Nunito Sans SemiBold",
          value: "nunito-sans-semibold",
          fontFamily: '"Nunito Sans", sans-serif',
          fontWeight: 600,
        },
        {
          label: "Nunito Sans Bold",
          value: "nunito-sans-bold",
          fontFamily: '"Nunito Sans", sans-serif',
          fontWeight: 700,
        },
        {
          label: "Sansita Regular",
          value: "sansita-regular",
          fontFamily: '"Sansita", sans-serif',
          fontWeight: 400,
        },
        {
          label: "Sansita Bold",
          value: "sansita-bold",
          fontFamily: '"Sansita", sans-serif',
          fontWeight: 700,
        },
        {
          label: "Sansita Extra Bold",
          value: "sansita-extrabold",
          fontFamily: '"Sansita", sans-serif',
          fontWeight: 800,
        },
        {
          label: "Sansita Black",
          value: "sansita-black",
          fontFamily: '"Sansita", sans-serif',
          fontWeight: 900,
        },
      ];

      const selectedOption =
        fontFamilyOptions.find((opt) => opt.value === value) ||
        fontFamilyOptions[0];

      return (
        <div className="relative" ref={fontDropdownRef}>
          <button
            type="button"
            onClick={() => setFontDropdownOpen(!fontDropdownOpen)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none text-left flex items-center justify-between"
            style={{
              fontFamily: selectedOption.fontFamily,
              fontWeight: selectedOption.fontWeight,
            }}
          >
            <span>{selectedOption.label}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {fontDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {fontFamilyOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    updateProp(key, option.value);
                    setFontDropdownOpen(false);
                  }}
                  className={cn(
                    "px-3 py-2 cursor-pointer hover:bg-(--light-pink) transition-colors",
                    option.value === value && "bg-(--light-pink)",
                  )}
                  style={{
                    fontFamily: option.fontFamily,
                    fontWeight: option.fontWeight,
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Special handling for color prop in SectionContainer
    if (key === "color" && editingComponent?.type === "SectionContainer") {
      const colorOptions = [
        { label: "White", value: "bg-white" },
        { label: "Light Pink", value: "bg-(--light-pink)" },
        { label: "Light Gray", value: "bg-gray-50" },
        { label: "Gray 100", value: "bg-gray-100" },
        { label: "Gray 200", value: "bg-gray-200" },
        { label: "Primary Teal", value: "bg-(--primary-teal)" },
        { label: "Primary Teal Dark", value: "bg-(--primary-teal-dark)" },
        { label: "Primary Coral", value: "bg-(--primary-coral)" },
        { label: "Coral Pink", value: "bg-(--coral-pink)" },
        { label: "Teal 50", value: "bg-teal-50" },
        { label: "Teal 100", value: "bg-teal-100" },
        { label: "Pink 50", value: "bg-pink-50" },
        { label: "Pink 100", value: "bg-pink-100" },
        { label: "Blue 50", value: "bg-blue-50" },
        { label: "Blue 100", value: "bg-blue-100" },
        { label: "Transparent", value: "bg-transparent" },
      ];

      const selectedOption =
        colorOptions.find((opt) => opt.value === value) || colorOptions[0];

      return (
        <div className="relative" ref={colorDropdownRef}>
          <button
            type="button"
            onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none text-left flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded border-2 border-gray-300",
                  selectedOption.value,
                )}
              />
              <span>{selectedOption.label}</span>
            </div>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {colorDropdownOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {colorOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    updateProp(key, option.value);
                    setColorDropdownOpen(false);
                  }}
                  className={cn(
                    "px-3 py-2 cursor-pointer hover:bg-(--light-pink) transition-colors flex items-center gap-3",
                    option.value === value && "bg-(--light-pink)",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded border-2 border-gray-300",
                      option.value,
                    )}
                  />
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (typeof value === "boolean") {
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => updateProp(key, e.target.checked)}
            className="w-5 h-5 text-(--primary-teal) border-gray-300 rounded focus:ring-(--primary-teal)"
          />
          <span className="text-sm">{value ? "True" : "False"}</span>
        </label>
      );
    }

    if (Array.isArray(value)) {
      return (
        <textarea
          value={JSON.stringify(value as unknown[], null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              updateProp(key, parsed);
            } catch {
              // Invalid JSON, don't update
            }
          }}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none resize-vertical min-h-[150px] font-mono text-sm"
          placeholder="Enter JSON array"
        />
      );
    }

    // Default to text input for strings
    return (
      <input
        type="text"
        value={(value as string) || ""}
        onChange={(e) => updateProp(key, e.target.value)}
        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
        placeholder={`Enter ${key}`}
      />
    );
  };

  const handleSavePage = () => {
    // Call API to save page
    savePageApi({
      pageName,
      components,
      blogTitle,
      blogDescription,
      blogDate,
      blogImageUrl,
      blogLabels,
    }).then((result) => {
      if (result.success) {
        setPageSaved(true);
        setToastMessage("Page saved successfully");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        setPageSaved(false);
        setToastMessage("Failed to save page");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-30 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-(--primary-teal-dark) sansita-bold mb-2">
              Blog Creator{pageName && ` - ${pageName}`}
            </h1>
            <p className="text-(--text-dark) nunito-sans">
              Drag and drop components to build your blog page
            </p>
          </div>

          <div
            className={cn(
              "bg-white rounded-lg shadow-lg p-6 mb-6 transition-opacity",
              !pageName && "opacity-50 pointer-events-none",
            )}
          >
            <h2 className="text-2xl font-bold text-(--primary-teal-dark) sansita-bold mb-4">
              Blog Card Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-(--primary-teal-dark) mb-2">
                    Page Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Enter blog title"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-(--primary-teal-dark) mb-2">
                    Page Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={blogDescription}
                    onChange={(e) => setBlogDescription(e.target.value)}
                    placeholder="Enter page description"
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none resize-vertical"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-(--primary-teal-dark) mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={blogDate}
                    onChange={(e) => setBlogDate(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-(--primary-teal-dark) mb-2">
                    Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={blogImageUrl}
                    onChange={(e) => setBlogImageUrl(e.target.value)}
                    placeholder="https://picsum.photos/200"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-(--primary-teal-dark) mb-2">
                    Labels <span className="text-red-500">*</span>
                  </label>
                  <div className="relative" ref={labelsDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setLabelsDropdownOpen(!labelsDropdownOpen)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none text-left flex items-center justify-between"
                    >
                      <span className="text-gray-500">
                        {blogLabels.length > 0
                          ? `${blogLabels.length} label${
                              blogLabels.length > 1 ? "s" : ""
                            } selected`
                          : "Select labels"}
                      </span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {labelsDropdownOpen && (
                      <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {ALL_LABELS.map((label) => (
                          <div
                            key={label}
                            onClick={() => {
                              if (blogLabels.includes(label)) {
                                setBlogLabels(
                                  blogLabels.filter((l) => l !== label),
                                );
                              } else {
                                setBlogLabels([...blogLabels, label]);
                              }
                            }}
                            className={cn(
                              "px-4 py-2 cursor-pointer hover:bg-(--light-pink) transition-colors flex items-center gap-2",
                              blogLabels.includes(label) && "bg-(--light-pink)",
                            )}
                          >
                            <div
                              className={cn(
                                "w-4 h-4 border-2 rounded flex items-center justify-center",
                                blogLabels.includes(label)
                                  ? "border-(--primary-teal) bg-(--primary-teal)"
                                  : "border-gray-300",
                              )}
                            >
                              {blogLabels.includes(label) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <span>{label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {blogLabels.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {blogLabels.map((label) => (
                        <span
                          key={label}
                          className="px-3 py-1 text-xs rounded-full bg-(--primary-teal) text-white flex items-center gap-1"
                        >
                          {label}
                          <button
                            onClick={() =>
                              setBlogLabels(
                                blogLabels.filter((l) => l !== label),
                              )
                            }
                            className="hover:bg-white hover:text-(--primary-teal) rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Live Preview */}
              <div>
                <h3 className="text-lg font-semibold text-(--primary-teal-dark) mb-3 sansita-bold">
                  Preview
                </h3>
                <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-200">
                  <div className="w-full h-64 overflow-hidden bg-gray-100">
                    {blogImageUrl ? (
                      <img
                        src={blogImageUrl}
                        alt={blogTitle || "Blog preview"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <h3 className="text-(--primary-teal-dark) text-xl sansita-bold line-clamp-2">
                      {blogTitle || "Blog Title"}
                    </h3>
                    <p className="text-(--text-dark) text-sm nunito-sans">
                      {blogDate
                        ? new Date(blogDate + "T00:00:00").toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )
                        : "Date"}
                    </p>
                    <p className="text-(--text-dark) nunito-sans line-clamp-3">
                      {blogDescription ||
                        "Blog description will appear here..."}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {blogLabels.length > 0 ? (
                        blogLabels.map((label) => (
                          <span
                            key={label}
                            className="px-3 py-1 text-xs rounded-full bg-(--light-pink) text-(--primary-teal-dark) nunito-sans font-semibold"
                          >
                            {label}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No labels selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setShowPreview(!showPreview)}
              disabled={!pageName}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors",
                showPreview
                  ? "bg-(--primary-teal) text-white"
                  : "bg-white text-(--primary-teal-dark) border-2 border-(--primary-teal)",
                !pageName && "opacity-50 cursor-not-allowed",
              )}
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "Edit Mode" : "Preview"}
            </button>
            <button
              onClick={handleSavePage}
              disabled={
                !pageName ||
                !validatePageName(pageName) ||
                !validateBlogMetadata(
                  blogTitle,
                  blogDescription,
                  blogDate,
                  blogImageUrl,
                  blogLabels,
                ) ||
                components.length === 0 ||
                pageSaved
              }
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-(--primary-teal) text-white font-semibold hover:bg-(--primary-teal-dark) disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {pageSaved ? "Page Saved" : "Save Page"}
            </button>
          </div>
          {(components.length === 0 ||
            !validateBlogMetadata(
              blogTitle,
              blogDescription,
              blogDate,
              blogImageUrl,
              blogLabels,
            )) && (
            <p className="text-center text-gray-500 text-sm mb-6">
              {components.length === 0
                ? "Add components to your page before saving"
                : "Fill out all blog card fields to enable saving"}
            </p>
          )}

          <div
            className={cn(
              "grid grid-cols-1 lg:grid-cols-4 gap-6 transition-opacity",
              !pageName && "opacity-50 pointer-events-none",
            )}
          >
            {/* Component Palette */}
            {!showPreview && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sticky top-24 space-y-6">
                  {/* Section Containers */}
                  <div>
                    <h2 className="text-xl font-bold text-(--primary-teal-dark) mb-4 sansita-bold">
                      Containers
                    </h2>
                    <div className="space-y-2">
                      {sectionContainerComponents.map((component) => (
                        <div
                          key={component.type}
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(component.type, e, true)
                          }
                          onDragEnd={handleDragEnd}
                          className="p-3 bg-(--primary-coral) bg-opacity-20 border-2 border-(--primary-coral) rounded-lg cursor-move hover:bg-(--primary-coral) hover:text-white transition-colors group"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{component.icon}</span>
                            <span className="font-semibold text-sm">
                              {component.name}
                            </span>
                          </div>
                          <p className="text-xs opacity-75 group-hover:opacity-100">
                            {component.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regular Components */}
                  <div>
                    <h2 className="text-xl font-bold text-(--primary-teal-dark) mb-4 sansita-bold">
                      Components
                    </h2>
                    <div className="space-y-2">
                      {availableComponents.map((component) => (
                        <div
                          key={component.type}
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(component.type, e, false)
                          }
                          onDragEnd={handleDragEnd}
                          className="p-3 bg-(--light-pink) rounded-lg cursor-move hover:bg-(--primary-teal) hover:text-white transition-colors group"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{component.icon}</span>
                            <span className="font-semibold text-sm">
                              {component.name}
                            </span>
                          </div>
                          <p className="text-xs opacity-75 group-hover:opacity-100">
                            {component.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Canvas Area */}
            <div
              className={cn(showPreview ? "lg:col-span-4" : "lg:col-span-3")}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 min-h-[600px]">
                {components.length === 0 ? (
                  <div
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(e) => handleDrop(e)}
                    className={cn(
                      "flex items-center justify-center h-full border-4 border-dashed rounded-lg transition-colors",
                      isInvalidDropTarget
                        ? "border-red-500 bg-red-50 cursor-not-allowed"
                        : "border-gray-300",
                    )}
                  >
                    <div className="text-center text-gray-500">
                      <p className="text-xl font-semibold mb-2">
                        {isInvalidDropTarget
                          ? "❌ Cannot drop components here"
                          : "Drop Section Containers here"}
                      </p>
                      <p className="text-sm">
                        {isInvalidDropTarget
                          ? "Only Section Containers can be placed on the canvas"
                          : "Start by dragging a Section Container from the Containers section"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {components.map((component, index) =>
                      component.type === "SectionContainer" ? (
                        <div
                          key={component.id}
                          {...(!showPreview && {
                            draggable: true,
                          })}
                          onDragStart={(e) =>
                            !showPreview &&
                            handleDragStartCanvas(index, e, undefined, true)
                          }
                          onDragOver={
                            !showPreview ? (e) => handleDragOver(e) : undefined
                          }
                          onDrop={
                            !showPreview
                              ? (e) => handleDrop(e, index)
                              : undefined
                          }
                          className={cn(
                            "relative group border-2 rounded-lg p-4",
                            !showPreview
                              ? "border-(--primary-coral) bg-(--primary-coral) bg-opacity-5"
                              : cn(
                                  "border-transparent",
                                  typeof component.props === "object" &&
                                    component.props !== null &&
                                    "color" in component.props
                                    ? ((
                                        component.props as Record<
                                          string,
                                          unknown
                                        >
                                      ).color as string)
                                    : "",
                                ),
                          )}
                        >
                          {!showPreview && (
                            <>
                              <div className="absolute -left-3 top-4 flex flex-col justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                  onMouseDown={(e) => e.stopPropagation()}
                                  className="p-2 bg-(--primary-coral) text-white rounded-full cursor-move hover:bg-(--coral-pink)"
                                  title="Drag to reorder"
                                >
                                  <GripVertical className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="absolute -right-3 top-4 flex flex-col justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(component.id);
                                  }}
                                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(component, index);
                                  }}
                                  className="p-2 bg-(--primary-teal) text-white rounded-full hover:bg-(--primary-teal-dark)"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="mb-3 text-xs font-semibold text-(--primary-coral) uppercase">
                                Section Container
                              </div>
                            </>
                          )}

                          {/* Section Container Children */}
                          <div
                            onDragOver={(e) => {
                              e.stopPropagation();
                              if (!showPreview) handleDragOver(e, component.id);
                            }}
                            onDrop={(e) => {
                              e.stopPropagation();
                              if (!showPreview)
                                handleDrop(e, undefined, component.id);
                            }}
                            className={cn(
                              "min-h-[150px] rounded-lg transition-colors",
                              !showPreview && "border-2 border-dashed p-4",
                              !showPreview && isInvalidDropTarget
                                ? "border-red-500 bg-red-50 cursor-not-allowed"
                                : !showPreview
                                  ? "border-gray-300"
                                  : "",
                              showPreview &&
                                typeof component.props === "object" &&
                                component.props !== null &&
                                "color" in component.props
                                ? ((component.props as Record<string, unknown>)
                                    .color as string)
                                : "",
                            )}
                          >
                            {component.children &&
                            component.children.length > 0 ? (
                              <div className="space-y-3">
                                {component.children.map((child, childIndex) => (
                                  <div
                                    key={child.id}
                                    {...(!showPreview && {
                                      draggable: true,
                                    })}
                                    onDragStart={(e) => {
                                      e.stopPropagation();
                                      if (!showPreview)
                                        handleDragStartCanvas(
                                          childIndex,
                                          e,
                                          component.id,
                                          false,
                                        );
                                    }}
                                    onDragOver={(e) => {
                                      e.stopPropagation();
                                      if (!showPreview)
                                        handleDragOver(e, component.id);
                                    }}
                                    onDrop={(e) => {
                                      e.stopPropagation();
                                      if (!showPreview)
                                        handleDrop(e, childIndex, component.id);
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!showPreview) {
                                        // Find the child in the parent's children array
                                        const parentIndex =
                                          components.findIndex(
                                            (c) => c.id === component.id,
                                          );
                                        if (
                                          parentIndex >= 0 &&
                                          components[parentIndex].children
                                        ) {
                                          handleEdit(
                                            child,
                                            childIndex,
                                            component.id,
                                          );
                                        }
                                      }
                                    }}
                                    className={cn(
                                      "relative group",
                                      !showPreview &&
                                        "border-2 border-transparent hover:border-(--primary-teal) rounded-lg cursor-pointer p-2",
                                    )}
                                  >
                                    {!showPreview && (
                                      <>
                                        <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                          <button
                                            onMouseDown={(e) =>
                                              e.stopPropagation()
                                            }
                                            className="p-1 bg-(--primary-teal) text-white rounded-full cursor-move hover:bg-(--primary-teal-dark)"
                                            title="Drag to reorder"
                                          >
                                            <GripVertical className="w-3 h-3" />
                                          </button>
                                        </div>
                                        <div className="absolute -right-2 top-0 bottom-0 flex flex-col justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const newComponents = [
                                                ...components,
                                              ];
                                              const parentIndex =
                                                newComponents.findIndex(
                                                  (c) => c.id === component.id,
                                                );
                                              if (
                                                parentIndex >= 0 &&
                                                newComponents[parentIndex]
                                                  .children
                                              ) {
                                                newComponents[
                                                  parentIndex
                                                ].children = newComponents[
                                                  parentIndex
                                                ].children!.filter(
                                                  (_, i) => i !== childIndex,
                                                );
                                                setComponents(newComponents);
                                              }
                                            }}
                                            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                            title="Delete"
                                          >
                                            <Trash2 className="w-3 h-3" />
                                          </button>
                                        </div>
                                      </>
                                    )}
                                    {
                                      <RenderedComponent
                                        item={internalToExport(child)}
                                      />
                                    }
                                  </div>
                                ))}
                              </div>
                            ) : (
                              !showPreview && (
                                <div
                                  className={cn(
                                    "flex items-center justify-center h-full text-sm",
                                    isInvalidDropTarget
                                      ? "text-red-500"
                                      : "text-gray-400",
                                  )}
                                >
                                  {isInvalidDropTarget
                                    ? "❌ Section Containers cannot be nested"
                                    : "Drop components here"}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <div key={component.id}>
                          Unexpected non-container component at root level
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Modal for URL Input and Confirmations */}
      <ConfirmModal
        modalState={modalState}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        onInputChange={(value) =>
          setModalState({ ...modalState, inputValue: value })
        }
      />

      {/* Edit Modal */}
      {editingComponent && (
        <EditModal
          editingComponent={editingComponent}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
          renderPropEditor={renderPropEditor}
        />
      )}

      {showToast && (
        <div className="fixed bottom-8 right-8 z-[70] animate-slide-up">
          <div
            className={cn(
              "bg-white border-2 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3",
              toastMessage === "Failed to save page"
                ? "border-red-500"
                : "border-(--primary-teal)",
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                toastMessage === "Failed to save page"
                  ? "bg-red-500"
                  : "bg-(--primary-teal)",
              )}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {toastMessage === "Failed to save page" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                )}
              </svg>
            </div>
            <span
              className={cn(
                "font-semibold nunito-sans",
                toastMessage === "Failed to save page"
                  ? "text-red-700"
                  : "text-(--primary-teal-dark)",
              )}
            >
              {toastMessage}
            </span>
          </div>
        </div>
      )}

      {!editingComponent && <Footer />}
    </div>
  );
};

export default BlogCreator;
