import { cn } from "@/lib/utils";
import type { HeaderWithTextType } from "../utils/export-types";
import InnerText from "../components/InnerText";

const HeaderWithText = ({
  headerContent,
  description,
  className,
  headerClassName,
}: HeaderWithTextType) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-1 tracking-tight max-w-3xl px-4 w-full justify-start xl:text-lg",
        className
      )}
    >
      <h2
        className={cn(
          "text-(--primary-teal-dark) text-2xl sansita-bold mb-2",
          headerClassName
        )}
      >
        {headerContent}
      </h2>
      <div className="ml-4"><InnerText {...description} /></div>
    </div>
  );
};

export default HeaderWithText;
