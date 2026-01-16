import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Bold, Italic, Link, Type } from "lucide-react";
import type { ComponentItem } from "../utils/types";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  editingComponent?: ComponentItem | null;
}

export const RichTextEditor = ({
  value,
  onChange,
  editingComponent,
}: RichTextEditorProps) => {
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
