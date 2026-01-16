import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { GripVertical, Trash2, Download, Eye, Code, Settings, X, Bold, Italic, Link, Type } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

// Import all components
import SectionContainer from "./components/SectionContainer";
import PartnerHeader from "./components/PartnerHeader";
import HorizontalAnchorList from "./components/HorizontalAnchorList";
import ContentWithHeading from "./components/ContentWithHeading";
import ContentWithImage from "./components/ContentWithImage";
import ContentUnorderedList from "./components/ContentUnorderedList";
import ContentImageList from "./components/ContentImageList";
import ContentText from "./components/ContentText";
import PartnerFooter from "./components/PartnerFooter";

interface ComponentItem {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
}

interface AvailableComponent {
  type: string;
  name: string;
  icon: string;
  defaultProps: Record<string, any>;
  description: string;
}

const availableComponents: AvailableComponent[] = [
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
      imageSrc: "/backgrounds/cats_dogs_photo_3x2.webp",
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
          imageUrl: "/backgrounds/cats_dogs_photo_3x2.webp",
          imageAlt: "Image 1",
          children: "Item description 1",
        },
        {
          imageUrl: "/backgrounds/cats_dogs_photo_3x2.webp",
          imageAlt: "Image 2",
          children: "Item description 2",
        },
      ],
    },
  },
  {
    type: "ContentText",
    name: "Rich Text",
    icon: "✍️",
    description: "Rich text with formatting options",
    defaultProps: {
      content: "Enter your text here",
      fontSize: "text-base",
      fontFamily: "nunito-sans",
      isBold: false,
      isItalic: false,
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

const componentMap: Record<string, React.ComponentType<any>> = {
  SectionContainer,
  PartnerHeader,
  HorizontalAnchorList,
  ContentWithHeading,
  ContentWithImage,
  ContentUnorderedList,
  ContentImageList,
  ContentText,
  PartnerFooter,
};

const BlogCreator = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [editingComponent, setEditingComponent] = useState<ComponentItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Rich Text Editor Component
  const RichTextEditor = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    
    const applyFormatting = (command: string, formatValue?: string) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      
      if (!selectedText && command !== "insertHTML") return;

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
        case "link":
          const url = prompt("Enter URL:");
          if (!url) return;
          newElement = document.createElement("a");
          newElement.setAttribute("href", url);
          newElement.setAttribute("target", "_blank");
          newElement.setAttribute("rel", "noopener noreferrer");
          newElement.className = "text-(--primary-teal) hover:underline";
          newElement.textContent = selectedText;
          break;
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
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => applyFormatting("italic")}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
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
          dangerouslySetInnerHTML={{ __html: value || "" }}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none min-h-[150px] bg-white"
        />
        
        <p className="text-xs text-gray-500">
          Select text to apply formatting, or edit directly
        </p>
      </div>
    );
  };

  const handleDragStart = (type: string, e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "copy";
    setDraggedComponent(type);
  };

  const handleDragStartCanvas = (index: number, e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = draggedIndex !== null ? "move" : "copy";
  };

  const handleDrop = (e: React.DragEvent, dropIndex?: number) => {
    e.preventDefault();

    if (draggedComponent) {
      // Dropping from palette
      const component = availableComponents.find(
        (c) => c.type === draggedComponent
      );
      if (!component) return;

      const newComponent: ComponentItem = {
        id: `${component.type}-${Date.now()}`,
        type: component.type,
        name: component.name,
        props: { ...component.defaultProps },
      };

      if (dropIndex !== undefined) {
        const newComponents = [...components];
        newComponents.splice(dropIndex, 0, newComponent);
        setComponents(newComponents);
      } else {
        setComponents([...components, newComponent]);
      }
    } else if (draggedIndex !== null && dropIndex !== undefined) {
      // Reordering within canvas
      const newComponents = [...components];
      const [removed] = newComponents.splice(draggedIndex, 1);
      newComponents.splice(dropIndex, 0, removed);
      setComponents(newComponents);
    }

    setDraggedComponent(null);
    setDraggedIndex(null);
  };

  const handleDelete = (id: string) => {
    setComponents(components.filter((c) => c.id !== id));
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

  const updateProp = (key: string, value: any) => {
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

  const renderPropEditor = (key: string, value: any) => {
    // Special handling for ContentText content editor
    if (key === "content" && editingComponent?.type === "ContentText") {
      return (
        <RichTextEditor
          value={value}
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
            children: "New item description",
          },
        ];
        updateProp(key, newItems);
      };

      const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        updateProp(key, newItems);
      };

      const updateItem = (index: number, field: string, newValue: any) => {
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
                  onChange={(e) => updateItem(index, "imageUrl", e.target.value)}
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
                  onChange={(e) => updateItem(index, "imageAlt", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:border-(--primary-teal) focus:outline-none"
                  placeholder="Image description"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Description
                </label>
                <textarea
                  value={String(item.children || "")}
                  onChange={(e) => updateItem(index, "children", e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:border-(--primary-teal) focus:outline-none resize-vertical"
                  rows={2}
                  placeholder="Item description"
                />
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
    if (key === "children" && typeof value === "object") {
      return (
        <textarea
          value={value?.toString() || ""}
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
          value={value}
          onChange={(e) => updateProp(key, parseFloat(e.target.value))}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
        />
      );
    }

    // Special handling for fontSize prop in ContentText
    if (key === "fontSize" && editingComponent?.type === "ContentText") {
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
        <select
          value={value}
          onChange={(e) => updateProp(key, e.target.value)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
        >
          {fontSizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    // Special handling for fontFamily prop in ContentText
    if (key === "fontFamily" && editingComponent?.type === "ContentText") {
      const fontFamilyOptions = [
        { label: "Nunito Sans", value: "nunito-sans" },
        { label: "Nunito Sans Light", value: "nunito-sans-light" },
        { label: "Nunito Sans Medium", value: "nunito-sans-medium" },
        { label: "Nunito Sans SemiBold", value: "nunito-sans-semibold" },
        { label: "Nunito Sans Bold", value: "nunito-sans-bold" },
        { label: "Sansita Regular", value: "sansita-regular" },
        { label: "Sansita Bold", value: "sansita-bold" },
        { label: "Sansita Extra Bold", value: "sansita-extrabold" },
        { label: "Sansita Black", value: "sansita-black" },
      ];

      return (
        <select
          value={value}
          onChange={(e) => updateProp(key, e.target.value)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
        >
          {fontFamilyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (typeof value === "boolean") {
      return (
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={value}
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
          value={JSON.stringify(value, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              updateProp(key, parsed);
            } catch (err) {
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
        value={value || ""}
        onChange={(e) => updateProp(key, e.target.value)}
        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-(--primary-teal) focus:outline-none"
        placeholder={`Enter ${key}`}
      />
    );
  };

  const moveComponent = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === components.length - 1)
    ) {
      return;
    }

    const newComponents = [...components];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newComponents[index], newComponents[targetIndex]] = [
      newComponents[targetIndex],
      newComponents[index],
    ];
    setComponents(newComponents);
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
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-(--primary-teal-dark) sansita-bold mb-2">
              Blog Creator
            </h1>
            <p className="text-(--text-dark) nunito-sans">
              Drag and drop components to build your blog page
            </p>
          </div>

          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors",
                showPreview
                  ? "bg-(--primary-teal) text-white"
                  : "bg-white text-(--primary-teal-dark) border-2 border-(--primary-teal)"
              )}
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "Edit Mode" : "Preview"}
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors",
                showCode
                  ? "bg-(--primary-teal) text-white"
                  : "bg-white text-(--primary-teal-dark) border-2 border-(--primary-teal)"
              )}
            >
              <Code className="w-4 h-4" />
              View Code
            </button>
            <button
              onClick={exportHTML}
              disabled={components.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--primary-coral) text-white font-semibold hover:bg-(--coral-pink) disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              Export HTML
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Component Palette */}
            {!showPreview && !showCode && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-4 sticky top-24">
                  <h2 className="text-xl font-bold text-(--primary-teal-dark) mb-4 sansita-bold">
                    Components
                  </h2>
                  <div className="space-y-2">
                    {availableComponents.map((component) => (
                      <div
                        key={component.type}
                        draggable
                        onDragStart={(e) => handleDragStart(component.type, e)}
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
                        Drop components here
                      </p>
                      <p className="text-sm">
                        Drag components from the left panel to start building
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {components.map((component, index) => (
                      <div
                        key={`${component.id}-${JSON.stringify(component.props)}`}
                        draggable={!showPreview}
                        onDragStart={(e) =>
                          !showPreview && handleDragStartCanvas(index, e)
                        }
                        onDragOver={!showPreview ? handleDragOver : undefined}
                        onDrop={
                          !showPreview
                            ? (e) => handleDrop(e, index)
                            : undefined
                        }
                        className={cn(
                          "relative group",
                          !showPreview && "border-2 border-transparent hover:border-(--primary-teal) rounded-lg"
                        )}
                      >
                        {!showPreview && (
                          <div className="absolute -left-3 top-0 bottom-0 flex flex-col justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                              onMouseDown={(e) => e.stopPropagation()}
                              className="p-2 bg-(--primary-teal) text-white rounded-full cursor-move hover:bg-(--primary-teal-dark)"
                              title="Drag to reorder"
                            >
                              <GripVertical className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {!showPreview && (
                          <div className="absolute -right-3 top-0 bottom-0 flex flex-col justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                              onClick={() => handleEdit(component, index)}
                              className="p-2 bg-(--primary-coral) text-white rounded-full hover:bg-(--coral-pink)"
                              title="Edit component"
                            >
                              <Settings className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(component.id)}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                              title="Delete component"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        <div className={cn(!showPreview && "p-4")}>
                          {renderComponent(component)}
                        </div>

                        {!showPreview && (
                          <div className="absolute top-2 left-2 bg-(--primary-teal) text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            {component.name}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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

      <Footer />
    </div>
  );
};

export default BlogCreator;
