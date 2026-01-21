import { cn } from "@/lib/utils";

const HeaderWithText = ({
  heading,
  children,
  className,
  headerClassName,
}: {
  heading: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-1 tracking-tight max-w-3xl px-4 w-full justify-start xl:text-lg",
        className
      )}
    >
      <h2
        className={cn(
          "text-(--primary-teal-dark) text-2xl sansita-bold mb-2",
          headerClassName
        )}
      >
        {heading}
      </h2>
      <div className="ml-4">{children}</div>
    </div>
  );
};

export default HeaderWithText;
