import { cn } from "@/lib/utils";

const ContentImageListItem = ({
  children,
  className,
  imageUrl,
  imageAlt,
}: {
  children: React.ReactNode;
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
        {children}
      </div>
    </li>
  );
};

export default ContentImageListItem;
