import { cn } from "@/lib/utils";
import type { SectionContainerType } from "../utils/export-types";
import RenderedComponent from "../components/RenderedComponent";

const SectionContainer = ({
  color,
  children,
  className,
  id,
}: SectionContainerType) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 justify-center items-center w-full my-0 py-1 text-sm md:text-base scroll-mt-36 md:scroll-mt-40",
        color,
        className
      )}
      id={id}
    >
      {Array.isArray(children)
        ? children.map((item, idx) => (
            <RenderedComponent key={idx} item={item} />
          ))
        : children}
    </div>
  );
};

export default SectionContainer;
