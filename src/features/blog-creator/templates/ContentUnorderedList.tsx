import { cn } from "@/lib/utils";
import type { ContentUnorderedListType } from "../utils/export-types";
import InnerText from "../components/InnerText";

const ContentUnorderedList = ({
  listItems,
  className,
}: ContentUnorderedListType) => {
  return (
    <ul
      className={cn(
        "list-disc list-inside flex flex-col gap-1 ml-2",
        className
      )}
    >
      {listItems.map((item, index) => (
        <li key={index}>
          <InnerText {...item} />
        </li>
      ))}
    </ul>
  );
};

export default ContentUnorderedList;
