import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  GripVertical,
  Trash2,
  Download,
  Eye,
  Code,
  X,
  Bold,
  Italic,
  Link,
  Type,
  Edit,
} from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { useOutsideClick } from "@/hooks/useOutsideClick";

// Import all components
import SectionContainer from "./templates/SectionContainer";
import PartnerHeader from "./templates/PartnerHeader";
import HorizontalAnchorList from "./components/HorizontalAnchorList";
import ContentWithHeading from "./templates/ContentWithHeading";
import ContentWithImage from "./templates/ContentWithImage";
import ContentUnorderedList from "./templates/ContentUnorderedList";
import ContentImageList from "./templates/ContentImageList";
import ContentText from "./components/ContentText";
import PartnerFooter from "./templates/PartnerFooter";

// Common themes/labels across blog pages
const ALL_LABELS = [
  "Basics",
  "Coverage",
  "Costs",
  "Comparison",
  "Exclusions",
  "Claims",
  "Benefits",
  "Pet Health",
  "Types",
  "Terminology",
];

interface ComponentItem {
  id: string;
  type: string;
  name: string;
  props: Record<string, unknown>;
  children?: ComponentItem[]; // For Section Containers
}

type PropList = { [key: string]: unknown };

type SavedComponentType = {
  name: string;
  props: PropList;
  children?: SavedComponentType;
};

type SavedPage = {
  name: string;
  components: SavedComponentType[];
  timestamp: Date;
  card?: {
    title: string;
    description: string;
    date: string;
    imageUrl: string;
    labels: string[];
  };
};

interface AvailableComponent {
  type: string;
  name: string;
  icon: string;
  defaultProps: Record<string, unknown>;
  description: string;
}

const sectionContainerComponents: AvailableComponent[] = [
  {
    type: "SectionContainer",
    name: "Section Container",
    icon: "📦",
    description: "A container for grouping content with scroll behavior",
    defaultProps: {
      color: "bg-white",
      id: "section-1",
      children: "Section content goes here",
    },
  },
];

const availableComponents: AvailableComponent[] = [
  {
    type: "PartnerHeader",
    name: "Partner Header",
    icon: "🏢",
    description: "Header with logo, title, and review stars",
    defaultProps: {
      title: "Partner Name",
      imgUrl: "/backgrounds/cats_dogs_photo_3x2.webp",
      reviewStars: 4.5,
      children: "Partner description goes here",
    },
  },
  {
    type: "HorizontalAnchorList",
    name: "Anchor Navigation",
    icon: "🔗",
    description: "Horizontal scrolling navigation with anchors",
    defaultProps: {
      anchors: [
        { id: "section-1", label: "SECTION 1" },
        { id: "section-2", label: "SECTION 2" },
      ],
    },
  },
  {
    type: "ContentWithHeading",
    name: "Content with Heading",
    icon: "📝",
    description: "Text content with a heading",
    defaultProps: {
      heading: "Heading Text",
      children: "Content goes here",
    },
  },
  {
    type: "ContentWithImage",
    name: "Content with Image",
    icon: "🖼️",
    description: "Content with an icon/image beside it",
    defaultProps: {
      heading: "Image Content",
      imageSrc: "/pages/partner/prudentpet/coverage.svg",
      children: "Description text",
    },
  },
  {
    type: "ContentUnorderedList",
    name: "Unordered List",
    icon: "📋",
    description: "Bulleted list of items",
    defaultProps: {
      children: (
        <>
          <li>List item 1</li>
          <li>List item 2</li>
          <li>List item 3</li>
        </>
      ),
    },
  },
  {
    type: "ContentImageList",
    name: "Image List",
    icon: "🎨",
    description: "Horizontal list with images",
    defaultProps: {
      imageListItems: [
        {
          imageUrl: "/pages/partner/prudentpet/pet_insurance.svg",
          imageAlt: "Image 1",
          children: {
            type: "ContentText",
            props: {
              content: "Item description 1",
              fontFamily: "nunito-sans",
            },
          },
        },
        {
          imageUrl: "/pages/partner/prudentpet/pet_insurance.svg",
          imageAlt: "Image 2",
          children: {
            type: "ContentText",
            props: {
              content: "Item description 2",
              fontFamily: "nunito-sans",
            },
          },
        },
      ],
    },
  },
  {
    type: "ContentText",
    name: "Content Text",
    icon: "✍️",
    description: "Rich text with formatting options",
    defaultProps: {
      content: "Enter your text here",
      fontFamily: "nunito-sans",
    },
  },
  {
    type: "PartnerFooter",
    name: "Partner Footer",
    icon: "👣",
    description: "Footer with review section and CTA",
    defaultProps: {
      children: "Review content goes here",
    },
  },
];

const componentMap: Record<
  string,
  React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>
> = {
  SectionContainer: SectionContainer as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  PartnerHeader: PartnerHeader as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  HorizontalAnchorList: HorizontalAnchorList as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  ContentWithHeading: ContentWithHeading as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  ContentWithImage: ContentWithImage as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  ContentUnorderedList: ContentUnorderedList as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  ContentImageList: ContentImageList as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  ContentText: ContentText as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
  PartnerFooter: PartnerFooter as unknown as React.ComponentType<{
    [key: string]: unknown;
    children?: React.ReactNode;
  }>,
};

const BlogCreator = () => {
  const { pageName: urlPageName } = useParams<{ pageName: string }>();
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [pageName, setPageName] = useState("");

  // Blog metadata fields
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogDate, setBlogDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [blogImageUrl, setBlogImageUrl] = useState("https://picsum.photos/200");
  const [blogLabels, setBlogLabels] = useState<string[]>([]);
  const [labelsDropdownOpen, setLabelsDropdownOpen] = useState(false);
  const labelsDropdownRef = useRef<HTMLDivElement>(null!);

  // Load page data from localStorage if editing existing page
  useEffect(() => {
    if (urlPageName) {
      const pagesJson = localStorage.getItem("pages");
      if (pagesJson) {
        const pages: SavedPage[] = JSON.parse(pagesJson);
        const existingPage = pages.find((p) => p.name === urlPageName);
        if (existingPage) {
          setPageName(existingPage.name);

          // Recursive function to load components with children
          const loadComponents = (
            savedComps: SavedComponentType[],
            parentId = ""
          ): ComponentItem[] => {
            return savedComps.map((comp, index) => ({
              id: `${comp.name}-${parentId}-${index}-${Date.now()}`,
              type: comp.name,
              name: comp.name,
              props: comp.props,
              ...(comp.children && {
                children: loadComponents(
                  [comp.children] as unknown as SavedComponentType[],
                  `${parentId}-${index}`
                ),
              }),
            }));
          };

          const loadedComponents: ComponentItem[] = loadComponents(
            existingPage.components
          );
          setComponents(loadedComponents);

          // Load blog card data
          if (existingPage.card) {
            setBlogTitle(existingPage.card.title);
            setBlogDescription(existingPage.card.description);
            setBlogDate(existingPage.card.date);
            setBlogImageUrl(existingPage.card.imageUrl);
            setBlogLabels(existingPage.card.labels);
          }
        } else {
          // New page - just set the name from URL
          setPageName(urlPageName);
        }
      } else {
        // No pages exist yet - just set the name from URL
        setPageName(urlPageName);
      }
    }
  }, [urlPageName]);

  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedFromContainer, setDraggedFromContainer] = useState<
    string | null
  >(null);
  const [isDraggingSectionContainer, setIsDraggingSectionContainer] =
    useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [editingComponent, setEditingComponent] =
    useState<ComponentItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const fontDropdownRef = useRef<HTMLDivElement>(null!);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [pageSaved, setPageSaved] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "prompt" | "confirm";
    title: string;
    message: string;
    inputValue: string;
    onConfirm: (value?: string) => void;
    onCancel: () => void;
  }>({
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

  // Auto-save entire page after 1 second of editing
  useEffect(() => {
    if (!pageName) return;

    const timer = setTimeout(() => {
      // Recursive function to convert ComponentItem[] to SavedComponentType[]
      const convertToSaved = (items: ComponentItem[]): SavedComponentType[] => {
        return items.map((component) => ({
          name: component.name,
          props: component.props,
          ...(component.children && {
            children: convertToSaved(
              component.children
            ) as unknown as SavedComponentType,
          }),
        }));
      };

      const savedComponents: SavedComponentType[] = convertToSaved(components);

      const pageData: SavedPage = {
        name: pageName,
        components: savedComponents,
        timestamp: new Date(),
        card: {
          title: blogTitle,
          description: blogDescription,
          date: blogDate,
          imageUrl: blogImageUrl,
          labels: blogLabels,
        },
      };

      // Get existing pages from localStorage
      const existingPagesJson = localStorage.getItem("pages");
      const existingPages: SavedPage[] = existingPagesJson
        ? JSON.parse(existingPagesJson)
        : [];

      // Find the page by name
      const existingPageIndex = existingPages.findIndex(
        (p) => p.name === pageName
      );

      if (existingPageIndex >= 0) {
        // Update existing page
        existingPages[existingPageIndex] = pageData;
      } else {
        // Add new page
        existingPages.push(pageData);
      }

      // Save to localStorage without showing toast
      localStorage.setItem("pages", JSON.stringify(existingPages));
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    pageName,
    blogTitle,
    blogDescription,
    blogDate,
    blogImageUrl,
    blogLabels,
    components,
  ]);

  // Re-enable save button when page content changes
  const [lastSavedState, setLastSavedState] = useState("");
  const currentState = JSON.stringify({ pageName, components });
  if (pageSaved && currentState !== lastSavedState) {
    setPageSaved(false);
  }
  if (pageSaved && lastSavedState === "") {
    setLastSavedState(currentState);
  }

  // Rich Text Editor Component
  const RichTextEditor = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (val: string) => void;
  }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isBoldActive, setIsBoldActive] = useState(false);
    const [isItalicActive, setIsItalicActive] = useState(false);

    const checkFormatting = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        setIsBoldActive(false);
        setIsItalicActive(false);
        return;
      }

      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const parentElement =
        container.nodeType === Node.TEXT_NODE
          ? container.parentElement
          : (container as Element);

      // Check for bold
      let element = parentElement;
      let hasBold = false;
      while (element && element !== editorRef.current) {
        if (element.tagName === "STRONG") {
          hasBold = true;
          break;
        }
        element = element.parentElement;
      }
      setIsBoldActive(hasBold);

      // Check for italic
      element = parentElement;
      let hasItalic = false;
      while (element && element !== editorRef.current) {
        if (element.tagName === "EM") {
          hasItalic = true;
          break;
        }
        element = element.parentElement;
      }
      setIsItalicActive(hasItalic);
    };

    const applyFormatting = (command: string, formatValue?: string) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (!selectedText && command !== "insertHTML") return;

      // Check if selection is already formatted
      const container = range.commonAncestorContainer;
      const parentElement =
        container.nodeType === Node.TEXT_NODE
          ? container.parentElement
          : (container as Element);

      // For bold/italic, check if we need to remove formatting
      if (command === "bold" || command === "italic") {
        const tagName = command === "bold" ? "STRONG" : "EM";
        let element = parentElement;

        // Traverse up to find the formatting tag
        while (element && element !== editorRef.current) {
          if (element.tagName === tagName) {
            // Remove the formatting by replacing with text
            const textNode = document.createTextNode(element.textContent || "");
            element.parentNode?.replaceChild(textNode, element);

            if (editorRef.current) {
              onChange(editorRef.current.innerHTML);
            }
            return;
          }
          element = element.parentElement;
        }
      }

      let newElement: HTMLElement;

      switch (command) {
        case "bold":
          newElement = document.createElement("strong");
          newElement.textContent = selectedText;
          break;
        case "italic":
          newElement = document.createElement("em");
          newElement.textContent = selectedText;
          break;
        case "link": {
          const url = prompt("Enter URL:");
          if (url) {
            // Convert to absolute URL if needed
            let finalUrl = url;
            if (
              !url.startsWith("http://") &&
              !url.startsWith("https://") &&
              !url.startsWith("mailto:") &&
              !url.startsWith("tel:")
            ) {
              finalUrl = "https://" + url;
            }

            const linkElement = document.createElement("a");
            linkElement.setAttribute("href", finalUrl);
            linkElement.setAttribute("target", "_blank");
            linkElement.setAttribute("rel", "noopener noreferrer");
            linkElement.className = "text-(--primary-teal) hover:underline";
            linkElement.textContent = selectedText;

            range.deleteContents();
            range.insertNode(linkElement);

            if (editorRef.current) {
              onChange(editorRef.current.innerHTML);
            }
            setTimeout(() => checkFormatting(), 0);
          }
          return;
        }
        case "fontSize":
          if (!formatValue) return;
          newElement = document.createElement("span");
          newElement.className = formatValue;
          newElement.textContent = selectedText;
          break;
        default:
          return;
      }

      range.deleteContents();
      range.insertNode(newElement);

      // Update the content
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }

      // Check formatting state after applying
      setTimeout(() => checkFormatting(), 0);
    };

    const fontSizeOptions = [
      { label: "Extra Small", value: "text-xs" },
      { label: "Small", value: "text-sm" },
      { label: "Base", value: "text-base" },
      { label: "Large", value: "text-lg" },
      { label: "Extra Large", value: "text-xl" },
      { label: "2XL", value: "text-2xl" },
      { label: "3XL", value: "text-3xl" },
      { label: "4XL", value: "text-4xl" },
    ];

    return (
      <div className="space-y-3">
        {/* Formatting Toolbar */}
        <div className="flex flex-wrap gap-2 p-3 bg-gray-100 rounded-lg border border-gray-300">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-gray-600 mr-2">
              Selected Text:
            </span>
            <button
              onClick={() => applyFormatting("bold")}
              className={`p-2 hover:bg-gray-200 rounded transition-colors ${
                isBoldActive ? "bg-gray-300 shadow-inner" : ""
              }`}
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => applyFormatting("italic")}
              className={`p-2 hover:bg-gray-200 rounded transition-colors ${
                isItalicActive ? "bg-gray-300 shadow-inner" : ""
              }`}
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => applyFormatting("link")}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Add Link"
            >
              <Link className="w-4 h-4" />
            </button>
          </div>

          <div className="border-l border-gray-300 mx-1" />

          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-gray-600" />
            <select
              onChange={(e) => applyFormatting("fontSize", e.target.value)}
              className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-(--primary-teal)"
              defaultValue=""
            >
              <option value="" disabled>
                Font Size
              </option>
              {fontSizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Editor */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => {
            onChange(e.currentTarget.innerHTML);
          }}
          onMouseUp={checkFormatting}
          onKeyUp={checkFormatting}
          dangerouslySetInnerHTML={{ __html: value || "" }}
          className={cn(
            "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none min-h-[150px] bg-white",
            editingComponent?.props?.fontFamily || "nunito-sans"
          )}
          style={{
            fontFamily:
              editingComponent?.props?.fontFamily === "nunito-sans"
                ? '"Nunito Sans", sans-serif'
                : editingComponent?.props?.fontFamily === "nunito-sans-light"
                ? '"Nunito Sans", sans-serif'
                : editingComponent?.props?.fontFamily === "nunito-sans-medium"
                ? '"Nunito Sans", sans-serif'
                : editingComponent?.props?.fontFamily === "nunito-sans-semibold"
                ? '"Nunito Sans", sans-serif'
                : editingComponent?.props?.fontFamily === "nunito-sans-bold"
                ? '"Nunito Sans", sans-serif'
                : editingComponent?.props?.fontFamily === "sansita-regular"
                ? '"Sansita", sans-serif'
                : editingComponent?.props?.fontFamily === "sansita-bold"
                ? '"Sansita", sans-serif'
                : editingComponent?.props?.fontFamily === "sansita-extrabold"
                ? '"Sansita", sans-serif'
                : editingComponent?.props?.fontFamily === "sansita-black"
                ? '"Sansita", sans-serif'
                : '"Nunito Sans", sans-serif',
            fontWeight:
              editingComponent?.props?.fontFamily === "nunito-sans-light"
                ? 300
                : editingComponent?.props?.fontFamily === "nunito-sans"
                ? 400
                : editingComponent?.props?.fontFamily === "nunito-sans-medium"
                ? 500
                : editingComponent?.props?.fontFamily === "nunito-sans-semibold"
                ? 600
                : editingComponent?.props?.fontFamily === "nunito-sans-bold"
                ? 700
                : editingComponent?.props?.fontFamily === "sansita-regular"
                ? 400
                : editingComponent?.props?.fontFamily === "sansita-bold"
                ? 700
                : editingComponent?.props?.fontFamily === "sansita-extrabold"
                ? 800
                : editingComponent?.props?.fontFamily === "sansita-black"
                ? 900
                : 400,
          }}
        />

        <p className="text-xs text-gray-500">
          Select text to apply formatting, or edit directly
        </p>
      </div>
    );
  };

  const handleDragStart = (
    type: string,
    e: React.DragEvent,
    isContainer = false
  ) => {
    e.dataTransfer.effectAllowed = "copy";
    setDraggedComponent(type);
    setIsDraggingSectionContainer(isContainer);
  };

  const handleDragStartCanvas = (
    index: number,
    e: React.DragEvent,
    containerId?: string,
    isContainer = false
  ) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggedIndex(index);
    setDraggedFromContainer(containerId || null);
    setIsDraggingSectionContainer(isContainer);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = draggedIndex !== null ? "move" : "copy";
  };

  const handleDrop = (
    e: React.DragEvent,
    dropIndex?: number,
    targetContainerId?: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Only Section Containers can be dropped on the main canvas
    if (!targetContainerId && !isDraggingSectionContainer) {
      setDraggedComponent(null);
      setDraggedIndex(null);
      setDraggedFromContainer(null);
      setIsDraggingSectionContainer(false);
      return;
    }

    // Section Containers cannot be dropped inside other containers
    if (targetContainerId && isDraggingSectionContainer) {
      setDraggedComponent(null);
      setDraggedIndex(null);
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

      const newComponent: ComponentItem = {
        id: `${component.type}-${Date.now()}`,
        type: component.type,
        name: component.name,
        props: { ...component.defaultProps },
        ...(isDraggingSectionContainer && { children: [] }),
      };

      if (targetContainerId) {
        // Drop into a container
        const newComponents = [...components];
        const containerIndex = newComponents.findIndex(
          (c) => c.id === targetContainerId
        );
        if (containerIndex >= 0 && newComponents[containerIndex].children) {
          if (dropIndex !== undefined) {
            newComponents[containerIndex].children!.splice(
              dropIndex,
              0,
              newComponent
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
          (c) => c.id === targetContainerId
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
          (c) => c.id === draggedFromContainer
        );
        const targetIndex = newComponents.findIndex(
          (c) => c.id === targetContainerId
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

  const handleEdit = (component: ComponentItem, index: number) => {
    setEditingComponent({ ...component });
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    if (editingComponent && editingIndex !== null) {
      const newComponents = [...components];
      newComponents[editingIndex] = editingComponent;
      setComponents(newComponents);
      setEditingComponent(null);
      setEditingIndex(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingComponent(null);
    setEditingIndex(null);
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
    // Special handling for ContentText content editor
    if (key === "content" && editingComponent?.type === "ContentText") {
      return (
        <RichTextEditor
          value={value as string}
          onChange={(newValue) => updateProp(key, newValue)}
        />
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

    // Special handling for fontFamily prop in ContentText
    if (key === "fontFamily" && editingComponent?.type === "ContentText") {
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
                    option.value === value && "bg-(--light-pink)"
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

  const generateHTML = () => {
    // Basic HTML generation - this could be more sophisticated
    const html = components
      .map((comp) => {
        return `<!-- ${comp.name} -->
<div class="${comp.type}">
  ${JSON.stringify(comp.props, null, 2)}
</div>`;
      })
      .join("\n\n");

    return html;
  };

  const exportHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blog-page.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const validatePageName = (name: string): boolean => {
    // Must start with uppercase letter and contain only alphanumeric characters
    const regex = /^[A-Z][a-zA-Z0-9]*$/;
    return regex.test(name);
  };

  const validateBlogMetadata = (): boolean => {
    return !!(
      blogTitle.trim() &&
      blogDescription.trim() &&
      blogDate &&
      blogImageUrl.trim() &&
      blogLabels.length > 0
    );
  };

  const savePage = () => {
    if (!pageName) {
      alert("Please enter a page name");
      return;
    }

    if (!validatePageName(pageName)) {
      alert(
        "Page name must start with an uppercase letter and contain only alphanumeric characters (no spaces or special characters)"
      );
      return;
    }

    if (components.length === 0) {
      alert("Cannot save an empty page");
      return;
    }

    // Recursive function to convert ComponentItem[] to SavedComponentType[]
    const convertToSaved = (items: ComponentItem[]): SavedComponentType[] => {
      return items.map((component) => ({
        name: component.name,
        props: component.props,
        ...(component.children && {
          children: convertToSaved(
            component.children
          ) as unknown as SavedComponentType,
        }),
      }));
    };

    const savedComponents: SavedComponentType[] = convertToSaved(components);

    const newPage: SavedPage = {
      name: pageName,
      components: savedComponents,
      timestamp: new Date(),
      card: {
        title: blogTitle,
        description: blogDescription,
        date: blogDate,
        imageUrl: blogImageUrl,
        labels: blogLabels,
      },
    };

    // Get existing pages from localStorage
    const existingPagesJson = localStorage.getItem("pages");
    const existingPages: SavedPage[] = existingPagesJson
      ? JSON.parse(existingPagesJson)
      : [];

    // Check if page name already exists
    const existingPageIndex = existingPages.findIndex(
      (p) => p.name === pageName
    );
    if (existingPageIndex >= 0) {
      existingPages[existingPageIndex] = newPage;
    } else {
      existingPages.push(newPage);
    }

    // Save to localStorage
    localStorage.setItem("pages", JSON.stringify(existingPages));

    // Show toast and disable save button
    setPageSaved(true);
    setToastMessage(`Page "${pageName}" saved successfully!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const renderComponent = (item: ComponentItem) => {
    const Component = componentMap[item.type];
    if (!Component) return <div>Component not found: {item.type}</div>;

    try {
      // Add a key based on props to force re-render when props change
      return <Component key={JSON.stringify(item.props)} {...item.props} />;
    } catch (error) {
      return (
        <div className="text-red-500">
          Error rendering {item.name}: {String(error)}
        </div>
      );
    }
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

          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              disabled={!pageName}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors",
                showPreview
                  ? "bg-(--primary-teal) text-white"
                  : "bg-white text-(--primary-teal-dark) border-2 border-(--primary-teal)",
                !pageName && "opacity-50 cursor-not-allowed"
              )}
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "Edit Mode" : "Preview"}
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              disabled={!pageName}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors",
                showCode
                  ? "bg-(--primary-teal) text-white"
                  : "bg-white text-(--primary-teal-dark) border-2 border-(--primary-teal)",
                !pageName && "opacity-50 cursor-not-allowed"
              )}
            >
              <Code className="w-4 h-4" />
              View Code
            </button>
            <button
              onClick={exportHTML}
              disabled={components.length === 0 || !pageName}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--primary-coral) text-white font-semibold hover:bg-(--coral-pink) disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              Export HTML
            </button>
          </div>

          {/* Blog Metadata Section */}
          <div
            className={cn(
              "bg-white rounded-lg shadow-lg p-6 mb-6 transition-opacity",
              !pageName && "opacity-50 pointer-events-none"
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
                                  blogLabels.filter((l) => l !== label)
                                );
                              } else {
                                setBlogLabels([...blogLabels, label]);
                              }
                            }}
                            className={cn(
                              "px-4 py-2 cursor-pointer hover:bg-(--light-pink) transition-colors flex items-center gap-2",
                              blogLabels.includes(label) && "bg-(--light-pink)"
                            )}
                          >
                            <div
                              className={cn(
                                "w-4 h-4 border-2 rounded flex items-center justify-center",
                                blogLabels.includes(label)
                                  ? "border-(--primary-teal) bg-(--primary-teal)"
                                  : "border-gray-300"
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
                                blogLabels.filter((l) => l !== label)
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
                            }
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

          <div
            className={cn(
              "grid grid-cols-1 lg:grid-cols-4 gap-6 transition-opacity",
              !pageName && "opacity-50 pointer-events-none"
            )}
          >
            {/* Component Palette */}
            {!showPreview && !showCode && (
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
              className={cn(
                showPreview || showCode ? "lg:col-span-4" : "lg:col-span-3"
              )}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 min-h-[600px]">
                {showCode ? (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-(--primary-teal-dark) sansita-bold">
                      Generated HTML
                    </h2>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{generateHTML()}</code>
                    </pre>
                  </div>
                ) : components.length === 0 ? (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e)}
                    className="flex items-center justify-center h-full border-4 border-dashed border-gray-300 rounded-lg"
                  >
                    <div className="text-center text-gray-500">
                      <p className="text-xl font-semibold mb-2">
                        Drop Section Containers here
                      </p>
                      <p className="text-sm">
                        Start by dragging a Section Container from the
                        Containers section
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
                          onDragOver={!showPreview ? handleDragOver : undefined}
                          onDrop={
                            !showPreview
                              ? (e) => handleDrop(e, index)
                              : undefined
                          }
                          className={cn(
                            "relative group border-2 rounded-lg p-4",
                            !showPreview
                              ? "border-(--primary-coral) bg-(--primary-coral) bg-opacity-5"
                              : "border-transparent"
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
                              if (!showPreview) handleDragOver(e);
                            }}
                            onDrop={(e) => {
                              e.stopPropagation();
                              if (!showPreview)
                                handleDrop(e, undefined, component.id);
                            }}
                            className={cn(
                              "min-h-[150px] rounded-lg",
                              !showPreview &&
                                "border-2 border-dashed border-gray-300 p-4"
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
                                          false
                                        );
                                    }}
                                    onDragOver={(e) => {
                                      e.stopPropagation();
                                      if (!showPreview) handleDragOver(e);
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
                                            (c) => c.id === component.id
                                          );
                                        if (
                                          parentIndex >= 0 &&
                                          components[parentIndex].children
                                        ) {
                                          handleEdit(child, childIndex);
                                        }
                                      }
                                    }}
                                    className={cn(
                                      "relative group",
                                      !showPreview &&
                                        "border-2 border-transparent hover:border-(--primary-teal) rounded-lg cursor-pointer p-2"
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
                                                  (c) => c.id === component.id
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
                                                  (_, i) => i !== childIndex
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
                                    {renderComponent(child)}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              !showPreview && (
                                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                                  Drop components here
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <div key={component.id}>
                          Unexpected non-container component at root level
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Modal for URL Input and Confirmations */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-(--primary-teal-dark) sansita-bold">
                {modalState.title}
              </h2>
              {modalState.message && (
                <p className="text-sm text-gray-600 mt-2">
                  {modalState.message}
                </p>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {modalState.type === "prompt" && (
                <input
                  type="text"
                  value={modalState.inputValue}
                  onChange={(e) =>
                    setModalState({
                      ...modalState,
                      inputValue: e.target.value,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      modalState.onConfirm(modalState.inputValue);
                      setModalState({ ...modalState, isOpen: false });
                    } else if (e.key === "Escape") {
                      modalState.onCancel();
                      setModalState({ ...modalState, isOpen: false });
                    }
                  }}
                  autoFocus
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--primary-teal)"
                  placeholder="Enter URL..."
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  modalState.onCancel();
                  setModalState({ ...modalState, isOpen: false });
                }}
                className="px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  modalState.onConfirm(modalState.inputValue);
                  setModalState({ ...modalState, isOpen: false });
                }}
                className="px-6 py-2 rounded-lg bg-(--primary-teal) text-white font-semibold hover:bg-(--primary-teal-dark) transition-colors"
              >
                {modalState.type === "confirm" ? "Delete" : "OK"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingComponent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-(--primary-teal-dark) sansita-bold">
                  Edit {editingComponent.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Update the properties below
                </p>
              </div>
              <button
                onClick={handleCancelEdit}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {Object.entries(editingComponent.props).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-(--primary-teal-dark) mb-2 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    {renderPropEditor(key, value)}
                    <p className="text-xs text-gray-500 mt-1">
                      Type: {Array.isArray(value) ? "array" : typeof value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleCancelEdit}
                className="px-6 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 rounded-lg bg-(--primary-teal) text-white font-semibold hover:bg-(--primary-teal-dark) transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Page Button */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={savePage}
          disabled={
            !pageName ||
            !validatePageName(pageName) ||
            !validateBlogMetadata() ||
            components.length === 0 ||
            pageSaved
          }
          className="w-full max-w-md mx-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-(--primary-teal) text-white font-semibold hover:bg-(--primary-teal-dark) disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download className="w-5 h-5" />
          {pageSaved ? "Page Saved" : "Save Page"}
        </button>
        {(components.length === 0 || !validateBlogMetadata()) && (
          <p className="text-center text-gray-500 text-sm mt-2">
            {components.length === 0
              ? "Add components to your page before saving"
              : "Fill out all blog card fields to enable saving"}
          </p>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-8 z-[70] animate-slide-up">
          <div className="bg-white border-2 border-(--primary-teal) px-6 py-4 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-(--primary-teal) flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="font-semibold text-(--primary-teal-dark) nunito-sans">
              {toastMessage}
            </span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogCreator;
