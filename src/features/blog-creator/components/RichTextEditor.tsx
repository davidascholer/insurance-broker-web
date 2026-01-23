import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Bold, Italic, Link, Type } from "lucide-react";
import type { InternalComponentItem } from "../utils/internal-types";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  editingComponent?: InternalComponentItem | null;
  onFontFamilyChange?: (fontFamily: string) => void;
}

export const RichTextEditor = ({
  value,
  onChange,
  editingComponent,
  onFontFamilyChange,
}: RichTextEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [htmlError, setHtmlError] = useState<string>("");

  // Validate HTML whenever value changes
  useEffect(() => {
    const validateHTML = (html: string) => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        
        // Check for parsing errors
        const parserError = doc.querySelector("parsererror");
        if (parserError) {
          setHtmlError("Invalid HTML: " + parserError.textContent);
          return false;
        }

        // Check for unclosed tags
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        
        // If innerHTML doesn't match after parsing, there might be unclosed tags
        if (tempDiv.innerHTML !== html) {
          // Additional validation: check if it's a simple formatting difference or actual error
          const normalized1 = tempDiv.innerHTML.replace(/\s+/g, " ").trim();
          const normalized2 = html.replace(/\s+/g, " ").trim();
          
          if (normalized1.toLowerCase() !== normalized2.toLowerCase()) {
            setHtmlError("Warning: HTML may have unclosed or invalid tags");
            return false;
          }
        }

        setHtmlError("");
        return true;
      } catch {
        setHtmlError("Invalid HTML syntax");
        return false;
      }
    };

    validateHTML(value);
  }, [value]);

  const wrapSelection = (before: string, after: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    if (!selectedText) {
      alert("Please select text first");
      return;
    }

    const newValue =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newValue);

    // Restore focus and cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleBold = () => {
    wrapSelection("<strong>", "</strong>");
  };

  const handleItalic = () => {
    wrapSelection("<em>", "</em>");
  };

  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (!url) return;

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

    wrapSelection(
      `<a href="${finalUrl}" className="cursor-pointer" target="_blank"><strong>`,
      "</strong></a>"
    );
  };

  const handleFontSize = (sizeClass: string) => {
    wrapSelection(`<span className="${sizeClass}">`, "</span>");
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

  const currentFontFamily =
    ((editingComponent?.props as Record<string, unknown>)?.fontFamily as string) ||
    "nunito-sans";

  return (
    <div className="space-y-3">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap gap-3 p-3 bg-gray-100 rounded-lg border border-gray-300">
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold text-gray-600 mr-2">
            Format Text:
          </span>
          <button
            type="button"
            onClick={handleBold}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Bold - Wrap selected text in <strong>"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleItalic}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Italic - Wrap selected text in <em>"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleLink}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Add Link - Wrap selected text in <a>"
          >
            <Link className="w-4 h-4" />
          </button>
        </div>

        <div className="border-l border-gray-300 mx-1" />

        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-gray-600" />
          <select
            onChange={(e) => {
              if (e.target.value) {
                handleFontSize(e.target.value);
                e.target.value = ""; // Reset dropdown
              }
            }}
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

        <div className="border-l border-gray-300 mx-1" />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-600">
            Component Font:
          </span>
          <select
            value={currentFontFamily}
            onChange={(e) => {
              if (onFontFamilyChange) {
                onFontFamilyChange(e.target.value);
              }
            }}
            className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:border-(--primary-teal)"
          >
            {fontFamilyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* HTML Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full px-4 py-3 border-2 rounded-lg focus:outline-none min-h-[200px] bg-white font-mono text-sm",
          "resize-y",
          htmlError 
            ? "border-red-500 focus:border-red-600" 
            : "border-gray-300 focus:border-(--primary-teal)"
        )}
        placeholder="Write HTML here... Select text and use toolbar buttons to add formatting tags."
        spellCheck={false}
      />

      {/* Error Message */}
      {htmlError && (
        <div className="px-3 py-2 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
          <strong>⚠️ HTML Validation Error:</strong> {htmlError}
        </div>
      )}

      <div className="text-xs text-gray-500 space-y-1">
        <p>
          <strong>Tip:</strong> Select text and click toolbar buttons to wrap with HTML tags
        </p>
        <p className="font-mono text-gray-400">
          Examples: &lt;strong&gt;bold&lt;/strong&gt;, &lt;em&gt;italic&lt;/em&gt;, &lt;span className="text-lg"&gt;large&lt;/span&gt;
        </p>
      </div>
    </div>
  );
};

