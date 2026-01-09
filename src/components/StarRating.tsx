import { cn } from "@/lib/utils";
import { useMemo } from "react";

export default function StarRating({
  starRating,
  starStyles,
  className,
}: {
  starRating: number;
  starStyles?: string;
  className?: string;
}) {
  const starRatings = useMemo(() => {
    const starRatings = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5; i++) {
      if (starRating >= i + 1) {
        starRatings[i] = 1;
      } else if (starRating > i) {
        starRatings[i] = starRating - i;
      } else {
        starRatings[i] = 0;
      }
    }
    return starRatings;
  }, [starRating]);

  return (
    <div className="flex items-center justify-center">
      <div className={cn("flex gap-1 text-xl", className)}>
        <div className="relative">
          <span className="text-gray-300">★</span>
          <span
            className={cn(
              "absolute top-0 left-0 overflow-hidden text-yellow-400",
              starStyles
            )}
            style={{ width: `${starRatings[0] * 100}%` }}
          >
            ★
          </span>
        </div>
        <div className="relative">
          <span className="text-gray-300">★</span>
          <span
            className={cn(
              "absolute top-0 left-0 overflow-hidden text-yellow-400",
              starStyles
            )}
            style={{ width: `${starRatings[1] * 100}%` }}
          >
            ★
          </span>
        </div>
        <div className="relative">
          <span className="text-gray-300">★</span>
          <span
            className={cn(
              "absolute top-0 left-0 overflow-hidden text-yellow-400",
              starStyles
            )}
            style={{ width: `${starRatings[2] * 100}%` }}
          >
            ★
          </span>
        </div>
        <div className="relative">
          <span className="text-gray-300">★</span>
          <span
            className={cn(
              "absolute top-0 left-0 overflow-hidden text-yellow-400",
              starStyles
            )}
            style={{ width: `${starRatings[3] * 100}%` }}
          >
            ★
          </span>
        </div>
        <div className="relative">
          <span className="text-gray-300">★</span>
          <span
            className={cn(
              "absolute top-0 left-0 overflow-hidden text-yellow-400",
              starStyles
            )}
            style={{ width: `${starRatings[4] * 100}%` }}
          >
            ★
          </span>
        </div>
      </div>
    </div>
  );
}
