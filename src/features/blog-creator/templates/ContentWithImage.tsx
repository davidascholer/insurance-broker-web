import { cn } from "@/lib/utils";
import type { ContentWithImageType } from "../utils/export-types";
import InnerText from "../components/InnerText";

const ContentWithImage = ({
  heading,
  imageSrc,
  content,
  className,
  imageClassName,
}: ContentWithImageType) => {
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
        <div className="ml-4 cursor-pointer">
          <InnerText {...content} />
        </div>
      </div>
    </div>
  );
};

export default ContentWithImage;
