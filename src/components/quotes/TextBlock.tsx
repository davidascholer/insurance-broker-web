import EditIcon from "@/components/icons/EditIcon";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import { formatArray } from "@/lib/utils";

interface TextBlockProps {
  ref: React.RefObject<HTMLDivElement | null>;
  nextQuestion: string;
  prevAnswer: string;
  onEditClicked: () => void;
}

const TextBlock = ({
  ref,
  nextQuestion,
  prevAnswer,
  onEditClicked,
}: TextBlockProps) => {
  return (
    <>
      <div className="flex flex-row items-center justify-start gap-2 text-(--text-dark)">
        <span onClick={onEditClicked} className="cursor-pointer flex flex-row items-center gap-2 p-2">
          {prevAnswer}
          <EditIcon />
        </span>
      </div>
      <div className="mt-12" ref={ref}>
        <TypewriterEffect
          cursorClassName="hidden"
          className="h-auto flex-1 font-bold"
          words={formatArray(nextQuestion)}
        />
      </div>
    </>
  );
};

export default TextBlock;
