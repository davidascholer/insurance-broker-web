import { cn } from "@/lib/utils";

const ContentWithImage = ({
  heading,
  imageSrc,
  children,
  className,
  imageClassName,
}: {
  heading: string;
  imageSrc: string;
  children: React.ReactNode;
  className?: string;
  imageClassName?: string;
}) => {
  return (
    <div className="flex flex-row flex-nowrap items-start gap-0">
      <img
        src={imageSrc}
        alt={heading}
        className={cn("w-10", imageClassName)}
      />
      <div
        className={cn(
          "flex flex-col items-start gap-2 px-4 justify-start",
          className
        )}
      >
        <h2 className="text-(--primary-teal-dark) sansita-regular tracking-widest">
          {heading}
        </h2>
        <div className="ml-4 cursor-pointer">{children}</div>
      </div>
    </div>
  );
};

export default ContentWithImage;
