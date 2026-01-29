import { cn } from "@/lib/utils";

const ContentUnorderedList = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <ul
      className={cn(
        "list-disc list-inside flex flex-col gap-1 ml-2",
        className
      )}
    >
      {children}
    </ul>
  );
};

export default ContentUnorderedList;
