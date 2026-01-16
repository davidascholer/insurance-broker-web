import StarRating from "@/components/StarRating";
import { cn } from "@/lib/utils";

const PartnerHeader = ({
  title,
  children,
  imgUrl,
  reviewStars,
  className,
}: {
  title: string;
  children: React.ReactNode;
  imgUrl: string;
  reviewStars: number;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col flex-nowrap min-sm:flex-row justify-center items-center gap-4", className)}>
      <div className="flex-1 flex flex-col items-start gap-1 tracking-tight max-w-3xl px-4 w-full justify-start xl:text-lg">
        <span className="flex flex-nowrap gap-2 justify-center items-center">
          <StarRating
            starRating={reviewStars}
            className="text-lg"
            starStyles="text-[#ED8F82]"
          />
          <span className="text-xs font-bold">{`Trustpilot rating: ${reviewStars} out of 5 (2,353 Customer Reviews)`}</span>
        </span>
        <h1 className="text-(--primary-teal-dark) text-4xl md:text-5xl sansita-bold text-center">
          {title}
        </h1>
        <p className="text-xs md:text-sm space-y-5">{children}</p>
      </div>
      <img src={imgUrl} alt={title} className="mx-auto mb-4 w-48" />
    </div>
  );
};

export default PartnerHeader;
