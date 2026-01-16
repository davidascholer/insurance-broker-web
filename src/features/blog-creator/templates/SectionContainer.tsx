import { cn } from "@/lib/utils";

const SectionContainer = ({
  color,
  children,
  className,
  id,
}: {
  color: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 justify-center items-center w-full my-0 py-1 text-sm md:text-base scroll-mt-36 md:scroll-mt-40",
        color,
        className
      )}
      id={id}
    >
      {children}
    </div>
  );
};

export default SectionContainer;
