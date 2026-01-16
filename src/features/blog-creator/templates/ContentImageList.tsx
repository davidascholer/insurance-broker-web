import { cn } from "@/lib/utils";
import ContentText from "../components/ContentText";

type ImageListItem = {
  imageUrl: string;
  imageAlt?: string;
  children: React.ReactNode | { type: string; props: Record<string, unknown> };
  className?: string;
};

const ContentImageListItem = ({
  children,
  className,
  imageUrl,
  imageAlt,
}: {
  children: React.ReactNode | { type: string; props: Record<string, unknown> };
  imageUrl: string;
  className?: string;
  imageAlt?: string;
}) => {
  // Handle ContentText component object
  const renderChildren = (): React.ReactNode => {
    if (typeof children === "object" && children !== null && "type" in children && children.type === "ContentText") {
      const { content, ...restProps } = children.props as Record<string, unknown>;
      if (typeof content === "string") {
        return <ContentText content={content} {...restProps} />;
      }
      // Optionally, render nothing or fallback if content is missing
      return null;
    }
    return children as React.ReactNode;
  };

  return (
    <li className={cn("flex flex-col gap-1 max-w-[150px]", className)}>
      <div className="flex flex-col justify-center items-start text-sm">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full max-w-[125px] p-4 aspect-square object-contain"
        />
        {renderChildren()}
      </div>
    </li>
  );
};

const ContentImageList = ({
  imageListItems,
  className,
}: {
  imageListItems: ImageListItem[];
  className?: string;
}) => {
  return (
    <ul
      className={cn(
        "list-disc list-outside flex flex-row flex-wrap gap-4 ml-2 justify-start items-start",
        className
      )}
    >
      {imageListItems
        ? imageListItems.map((item, index) => (
            <ContentImageListItem
              key={index}
              imageUrl={item.imageUrl}
              imageAlt={item.imageAlt}
              className={item.className}
            >
              {item.children}
            </ContentImageListItem>
          ))
        : null}
    </ul>
  );
};

export default ContentImageList;
