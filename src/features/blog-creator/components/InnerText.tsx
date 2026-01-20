import { cn } from "@/lib/utils";
import type { InnerTextType } from "../utils/export-types";
import { useMemo, type ReactNode } from "react";

const InnerText = ({
  content,
  fontFamily = "nunito-sans",
  className,
}: InnerTextType) => {
  // Parse HTML string and convert to React elements with Tailwind classes
  const parsedContent = useMemo(() => {
    if (!content) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const convertNodeToReact = (node: Node, key: number): ReactNode => {
      // Handle text nodes
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      // Handle element nodes
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();
        const children = Array.from(element.childNodes).map((child, i) =>
          convertNodeToReact(child, i)
        );

        // Map HTML tags to React elements with Tailwind classes
        const props: Record<string, unknown> = { key };

        switch (tagName) {
          case "b":
          case "strong":
            return (
              <strong key={key} className="font-bold">
                {children}
              </strong>
            );
          case "i":
          case "em":
            return (
              <em key={key} className="italic">
                {children}
              </em>
            );
          case "u":
            return (
              <span key={key} className="underline">
                {children}
              </span>
            );
          case "a":
            return (
              <a
                key={key}
                href={element.getAttribute("href") || "#"}
                className="text-blue-600 hover:text-blue-800 underline"
                target={element.getAttribute("target") || undefined}
                rel={element.getAttribute("rel") || undefined}
              >
                {children}
              </a>
            );
          case "p":
            return (
              <p key={key} className="mb-4 last:mb-0">
                {children}
              </p>
            );
          case "h1":
            return (
              <h1 key={key} className="text-4xl font-bold mb-4">
                {children}
              </h1>
            );
          case "h2":
            return (
              <h2 key={key} className="text-3xl font-bold mb-3">
                {children}
              </h2>
            );
          case "h3":
            return (
              <h3 key={key} className="text-2xl font-bold mb-3">
                {children}
              </h3>
            );
          case "h4":
            return (
              <h4 key={key} className="text-xl font-bold mb-2">
                {children}
              </h4>
            );
          case "h5":
            return (
              <h5 key={key} className="text-lg font-bold mb-2">
                {children}
              </h5>
            );
          case "h6":
            return (
              <h6 key={key} className="text-base font-bold mb-2">
                {children}
              </h6>
            );
          case "ul":
            return (
              <ul key={key} className="list-disc list-inside mb-4 space-y-1">
                {children}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="list-decimal list-inside mb-4 space-y-1">
                {children}
              </ol>
            );
          case "li":
            return <li key={key}>{children}</li>;
          case "br":
            return <br key={key} />;
          case "div":
            return (
              <div key={key} className={element.className || undefined}>
                {children}
              </div>
            );
          case "span":
            // Preserve inline styles if they exist
            const style: Record<string, string> = {};
            const elementStyle = element.getAttribute("style");
            if (elementStyle) {
              elementStyle.split(";").forEach((rule) => {
                const [prop, val] = rule.split(":").map((s) => s.trim());
                if (prop && val) {
                  // Convert CSS property to camelCase
                  const camelProp = prop.replace(/-([a-z])/g, (g) =>
                    g[1].toUpperCase()
                  );
                  style[camelProp] = val;
                }
              });
            }
            return (
              <span
                key={key}
                className={element.className || undefined}
                style={Object.keys(style).length > 0 ? style : undefined}
              >
                {children}
              </span>
            );
          case "blockquote":
            return (
              <blockquote
                key={key}
                className="border-l-4 border-gray-300 pl-4 italic my-4"
              >
                {children}
              </blockquote>
            );
          case "code":
            return (
              <code
                key={key}
                className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
              >
                {children}
              </code>
            );
          case "pre":
            return (
              <pre
                key={key}
                className="bg-gray-100 p-4 rounded overflow-x-auto mb-4"
              >
                {children}
              </pre>
            );
          default:
            // For unknown tags, return a div wrapper
            return <div key={key}>{children}</div>;
        }
      }

      return null;
    };

    const bodyChildren = Array.from(doc.body.childNodes).map((node, i) =>
      convertNodeToReact(node, i)
    );

    return bodyChildren;
  }, [content]);

  return (
    <div
      className={cn(
        fontFamily,
        "tracking-tight max-w-3xl px-4 w-full !font-[inherit]",
        className
      )}
      style={{
        fontFamily:
          fontFamily === "nunito-sans"
            ? '"Nunito Sans", sans-serif'
            : fontFamily === "nunito-sans-light"
              ? '"Nunito Sans", sans-serif'
              : fontFamily === "nunito-sans-medium"
                ? '"Nunito Sans", sans-serif'
                : fontFamily === "nunito-sans-semibold"
                  ? '"Nunito Sans", sans-serif'
                  : fontFamily === "nunito-sans-bold"
                    ? '"Nunito Sans", sans-serif'
                    : fontFamily === "sansita-regular"
                      ? '"Sansita", sans-serif'
                      : fontFamily === "sansita-bold"
                        ? '"Sansita", sans-serif'
                        : fontFamily === "sansita-extrabold"
                          ? '"Sansita", sans-serif'
                          : fontFamily === "sansita-black"
                            ? '"Sansita", sans-serif'
                            : undefined,
        fontWeight:
          fontFamily === "nunito-sans-light"
            ? 300
            : fontFamily === "nunito-sans"
              ? 400
              : fontFamily === "nunito-sans-medium"
                ? 500
                : fontFamily === "nunito-sans-semibold"
                  ? 600
                  : fontFamily === "nunito-sans-bold"
                    ? 700
                    : fontFamily === "sansita-regular"
                      ? 400
                      : fontFamily === "sansita-bold"
                        ? 700
                        : fontFamily === "sansita-extrabold"
                          ? 800
                          : fontFamily === "sansita-black"
                            ? 900
                            : undefined,
      }}
    >
      {parsedContent}
    </div>
  );
};

export default InnerText;
