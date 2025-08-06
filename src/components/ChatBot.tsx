import PipaIcon from "./icons/PipaIcon";
import { TypewriterEffect } from "./ui/TypewriterEffect";
import { formatArray } from "@/lib/utils";

const ChatBot = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div
      className="flex flex-row gap-4 p-4 mx-auto select-none cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-row justify-start items-center gap-4">
        <PipaIcon className="min-w-[40px]" />
        {/* <Textarea className="flex-1 w-[200px]" /> */}
        <TypewriterEffect
          cursorClassName="hidden"
          className="h-auto flex-1 font-bold slect-none text-sm max-[550px]:text-xs"
          words={formatArray(
            `Hello, I am PipaBot, Pipa Broker's AI assistant. How can I help you today?`
          )}
        />
      </div>
      {/* <Button
        type="submit"
        disabled={false}
        className="cursor-pointer"
        onClick={() => setIsHidden(false)}
      >
        Talk to PipaBot
      </Button> */}
    </div>
  );
};
export default ChatBot;
