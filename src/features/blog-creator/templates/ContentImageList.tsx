import { cn } from "@/lib/utils";

type ImageListItem = {
  imageUrl: string;
  imageAlt?: string;
  className?: string;
  text: React.ReactNode;
};

const ContentImageListItem = ({
  className,
  text,
  imageUrl,
  imageAlt,
}: {
  text: React.ReactNode;
  imageUrl: string;
  className?: string;
  imageAlt?: string;
}) => {
  return (
    <li className={cn("flex flex-col gap-1 max-w-[150px]", className)}>
      <div className="flex flex-col justify-center items-start text-sm">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full max-w-[125px] p-4 aspect-square object-contain"
        />
        {text}
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
              text={item.text}
            />
          ))
        : null}
    </ul>
  );
};

export default ContentImageList;
