import { cn } from "@/lib/utils";

const ChatBotIcon = ({
  handleClick,
  className,
  innerImg,
}: {
  handleClick: () => void;
  className?: string;
  innerImg?: React.ReactNode;
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
        {innerImg ? innerImg : null}
      </div>
    </div>
  );
};
export default ChatBotIcon;
