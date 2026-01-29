import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const HorizontalAnchorList = ({
  anchors,
  className,
}: {
  anchors: { id: string; label: string }[];
  className?: string;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const isOverflowing = scrollWidth > clientWidth;

    setShowArrows(isOverflowing);
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();

    const container = scrollContainerRef.current;
    if (!container) return;

    const handleResize = () => checkScroll();
    const handleScroll = () => checkScroll();

    window.addEventListener("resize", handleResize);
    container.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 w-full p-2 text-white",
        className
      )}
    >
      {showArrows && (
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={cn(
            "shrink-0 cursor-pointer",
            !canScrollLeft && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronLeft size={40} />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide flex-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {anchors.map((anchor) => (
          <a
            key={anchor.id}
            href={`#${anchor.id}`}
            className="whitespace-nowrap rounded-md text-white hover:text-(--primary-coral) transition-colors font-bold tracking-wider text-xs"
          >
            {anchor.label}
          </a>
        ))}
      </div>

      {showArrows && (
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={cn(
            "shrink-0 cursor-pointer",
            !canScrollRight && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronRight size={40} />
        </button>
      )}
    </div>
  );
};

export default HorizontalAnchorList;
