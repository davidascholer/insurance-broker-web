import { cn } from "@/lib/utils";

interface ContentTextProps {
  content: string;
  fontSize?: string;
  fontFamily?: string;
  isBold?: boolean;
  isItalic?: boolean;
  className?: string;
}

const ContentText = ({
  content,
  fontSize = "text-base",
  fontFamily = "nunito-sans",
  isBold = false,
  isItalic = false,
  className,
}: ContentTextProps) => {
  return (
    <div
      className={cn(
        fontSize,
        fontFamily,
        isBold && "font-bold",
        isItalic && "italic",
        "tracking-tight max-w-3xl px-4 w-full !font-[inherit]",
        className
      )}
      style={{
        fontFamily: fontFamily === "nunito-sans" ? '"Nunito Sans", sans-serif' :
                    fontFamily === "nunito-sans-light" ? '"Nunito Sans", sans-serif' :
                    fontFamily === "nunito-sans-medium" ? '"Nunito Sans", sans-serif' :
                    fontFamily === "nunito-sans-semibold" ? '"Nunito Sans", sans-serif' :
                    fontFamily === "nunito-sans-bold" ? '"Nunito Sans", sans-serif' :
                    fontFamily === "sansita-regular" ? '"Sansita", sans-serif' :
                    fontFamily === "sansita-bold" ? '"Sansita", sans-serif' :
                    fontFamily === "sansita-extrabold" ? '"Sansita", sans-serif' :
                    fontFamily === "sansita-black" ? '"Sansita", sans-serif' :
                    undefined,
        fontWeight: fontFamily === "nunito-sans-light" ? 300 :
                    fontFamily === "nunito-sans" ? 400 :
                    fontFamily === "nunito-sans-medium" ? 500 :
                    fontFamily === "nunito-sans-semibold" ? 600 :
                    fontFamily === "nunito-sans-bold" ? 700 :
                    fontFamily === "sansita-regular" ? 400 :
                    fontFamily === "sansita-bold" ? 700 :
                    fontFamily === "sansita-extrabold" ? 800 :
                    fontFamily === "sansita-black" ? 900 :
                    isBold ? 700 : undefined,
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ContentText;
