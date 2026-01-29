import { cn } from "@/lib/utils";

const ContentImageList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ul
      className={cn(
        "list-disc list-outside flex flex-row flex-wrap gap-4 ml-2 justify-start items-start",
        className
      )}
    >
      {children}
    </ul>
  );
};

export default ContentImageList;
