import { useState } from "react";
import PipaIcon from "./icons/PipaIcon";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const ChatBot = () => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <div className="flex flex-row justify-start items-center gap-4">
        <PipaIcon className="min-w-[40px]" />
        <Textarea className="flex-1 w-[200px]" />
      </div>
      <Button
        type="submit"
        disabled={false}
        className="cursor-pointer"
        onClick={() => setIsHidden(false)}
      >
        Talk to PipaBot
      </Button>

      <p className={isHidden ? "hidden" : ""}>
        What type of flowers would you like to order?
      </p>
    </div>
  );
};
export default ChatBot;
