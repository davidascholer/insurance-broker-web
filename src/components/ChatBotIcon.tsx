import { cn } from "@/lib/utils";

const ChatBotIcon = ({
  handleClick,
  className,
}: {
  handleClick: () => void;
  className?: string;
}) => {
  return (
    <div>
      <div
        className={cn(
          "cursor-pointer bg-(--coral-light) transition-colors duration-300 rounded-t-full rounded-br-full w-12 h-12 flex items-center justify-center",
          className
        )}
        onClick={handleClick}
      >
        {/* <span className="sansita-bold text-3xl flex justify-center items-center">Ai</span> */}
      </div>
    </div>
  );
};
export default ChatBotIcon;
