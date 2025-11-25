import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
      watchDrag: false,
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    // (event: React.KeyboardEvent<HTMLDivElement>) => {
    () => {
      // Omit this behavior
      // if (event.key === "ArrowLeft") {
      //   event.preventDefault();
      //   scrollPrev();
      // } else if (event.key === "ArrowRight") {
      //   event.preventDefault();
      //   scrollNext();
      // }
    },
    // [scrollPrev, scrollNext]
    []
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  const carouselContainerRef = React.useRef(null);
  const isSwipingEnabled = false;

  // ... (Other carousel state and logic)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSwipingEnabled) {
      e.preventDefault(); // Prevent default touch behavior if swipe is disabled
      return;
    }
    // ... (Your existing touch start logic for swipe)
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSwipingEnabled) {
      e.preventDefault();
      return;
    }
    // ... (Your existing touch move logic for swipe)
  };

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        ref={carouselContainerRef}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
}

function CarouselDots({
  items,
  className,
  textClassName,
}: React.ComponentProps<typeof Button> & {
  items: number;
  textClassName?: string;
}) {
  const { api } =
    // const { scrollPrev, canScrollPrev, scrollNext, canScrollNext, api } =
    useCarousel();
  const currentIndex = api?.selectedScrollSnap() ?? 0;

  return (
    <div className={className}>
      <div className="flex flex-row flex-nowrap gap-4">
        {/* <Button
          data-slot="carousel-previous"
          className={cn("size-8 rounded-full p-2 cursor-pointer", className)}
          disabled={!canScrollPrev}
          onClick={scrollPrev}
          {...props}
        >
          <ArrowLeft />
          <span className="sr-only">Previous slide</span>
        </Button> */}
        {Array.from({ length: items ?? 0 }).map((_, index) => (
          <Button
            key={index}
            data-slot="carousel-next"
            className={cn(
              "mx-1 h-3 w-3 rounded-full transition-opacity size-8 p-2 bg-(--primary-coral)",
              currentIndex >= index
                ? "opacity-100 cursor-pointer"
                : "opacity-50"
            )}
            aria-label={`Slide ${index}`}
            onClick={() => {
              if (currentIndex > index) api?.scrollTo(index);
            }}
          ></Button>
        ))}
        {/* <Button
          data-slot="carousel-next"
          className={cn("size-8 rounded-full p-2 cursor-pointer", className)}
          disabled={!canScrollNext}
          onClick={scrollNext}
          {...props}
        >
          <ArrowRight />
          <span className="sr-only">Next slide</span>
        </Button> */}
      </div>
      <p
        className={cn(
          "w-full text-center mt-2 text-sm font-medium text-(--text-dark) dark:text-(--text-light)",
          textClassName
        )}
      >
        Step {currentIndex + 1} of {items}
      </p>
    </div>
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

function CarouselCustomNextButton({
  className,
  children,
  type = "button",
  disabled = false,
  onSubmit,
  scrollRef,
}: React.ComponentProps<typeof Button> & {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onSubmit?: () => void;
  scrollRef?: React.RefObject<HTMLDivElement>;
}) {
  const { scrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next-trigger"
      className={className}
      type={type}
      disabled={disabled}
      onClick={() => {
        if (onSubmit) {
          onSubmit();
        }
        if (scrollRef?.current) {
          const fixedHeaderHeight = 60; // Example added height
          const scrollPosition =
            scrollRef.current.offsetTop - fixedHeaderHeight;

          window.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }
        scrollNext();
      }}
    >
      {children}
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselCustomNextButton,
};
