import type { AnswersType } from "@/lib/types";
import { cn, findCurrentQuestionIndex } from "@/lib/utils";

type ProgressGridType = {
  answers: AnswersType;
  className?: string;
};

const ProgressCircle = ({ filled }: { filled: boolean }) => {
  return (
    <div className="relative w-[12px] aspect-square bg-(--primary-teal-dark) rounded-full flex items-center justify-center border-[2px] border-(--primary-teal-dark)">
      <div
        className={cn(
          "w-[2px] aspect-square bg-(--primary-coral) rounded-full",
          filled ? "animate-circle-shrink" : "animate-circle-grow"
        )}
      ></div>
    </div>
  );
};
const ProgressGrid = ({ answers }: ProgressGridType) => {
  const answersLength = Object.keys(answers || {}).length;
  const currentIndex = findCurrentQuestionIndex(answers);
  return (
    <div className="flex flex-col flex-1 gap-4 items-center justify-between mt-20">
      {[...Array(answersLength)].map((_, idx) => (
        <ProgressCircle key={idx} filled={idx < currentIndex} />
      ))}
    </div>
  );
};
export default ProgressGrid;
