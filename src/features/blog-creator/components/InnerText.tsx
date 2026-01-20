import { cn } from "@/lib/utils";
import type { InnerTextType } from "../utils/export-types";

const InnerText = ({
  content,
  fontFamily = "nunito-sans",
  className,
}: InnerTextType) => {
  return (
    <div
      className={cn(
        fontFamily,
        "max-w-3xl px-4 w-full !font-[inherit]",
        className
      )}
      style={{
        fontFamily:
          fontFamily === "nunito-sans"
            ? '"Nunito Sans", sans-serif'
            : fontFamily === "nunito-sans-light"
              ? '"Nunito Sans", sans-serif'
              : fontFamily === "nunito-sans-medium"
                ? '"Nunito Sans", sans-serif'
                : fontFamily === "nunito-sans-semibold"
                  ? '"Nunito Sans", sans-serif'
                  : fontFamily === "nunito-sans-bold"
                    ? '"Nunito Sans", sans-serif'
                    : fontFamily === "sansita-regular"
                      ? '"Sansita", sans-serif'
                      : fontFamily === "sansita-bold"
                        ? '"Sansita", sans-serif'
                        : fontFamily === "sansita-extrabold"
                          ? '"Sansita", sans-serif'
                          : fontFamily === "sansita-black"
                            ? '"Sansita", sans-serif'
                            : undefined,
        fontWeight:
          fontFamily === "nunito-sans-light"
            ? 300
            : fontFamily === "nunito-sans"
              ? 400
              : fontFamily === "nunito-sans-medium"
                ? 500
                : fontFamily === "nunito-sans-semibold"
                  ? 600
                  : fontFamily === "nunito-sans-bold"
                    ? 700
                    : fontFamily === "sansita-regular"
                      ? 400
                      : fontFamily === "sansita-bold"
                        ? 700
                        : fontFamily === "sansita-extrabold"
                          ? 800
                          : fontFamily === "sansita-black"
                            ? 900
                            : undefined,
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default InnerText;
