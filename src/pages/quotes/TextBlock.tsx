import EditIcon from "@/components/icons/EditIcon";
import { TypewriterEffect } from "@/components/ui/TypewriterEffect";
import { formatArray } from "@/lib/utils";

interface TextBlockProps {
  ref: React.RefObject<HTMLDivElement | null>;
  nextQuestion: string;
  prevAnswer: string;
}

const TextBlock = ({ ref, nextQuestion, prevAnswer }: TextBlockProps) => {
  return (
    <>
      <div className="flex flex-row items-center justify-start gap-2 text-(--text-dark) ">
        <span>{prevAnswer}</span>
        <EditIcon />
      </div>
      <div className="mt-8" ref={ref}>
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
