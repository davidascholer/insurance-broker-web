import { cn, formatArray } from "@/lib/utils";
import ChatBotIcon from "./ChatBotIcon";
import { TypewriterEffect } from "./ui/TypewriterEffect";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import type { ChatMessageType } from "@/lib/types";
import BotMessageForm from "./BotMessageForm";
import Loader from "./Loader";

const Message = ({
  from,
  message,
  className,
  onClick,
}: {
  from: "bot" | "client";
  message: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-4 justify-center items-start mt-4 sansita-regular",
        className
      )}
      onClick={onClick}
    >
      {from === "bot" ? (
        <div className="flex flex-row gap-2 items-start justify-baseline w-full">
          <ChatBotIcon
            handleClick={() => {}}
            className={cn(
              "size-8 bg-(--primary-teal-dark) cursor-default",
              "-scale-x-100"
            )}
          />
          <TypewriterEffect
            cursorClassName="hidden"
            className="h-auto font-bold text-(--light-pink) text-sm self-end"
            words={formatArray(message)}
          />
        </div>
      ) : (
        <div className="flex flex-row gap-2 items-start justify-end w-full text-(--primary-teal)">
          <TypewriterEffect
            cursorClassName="hidden"
            className="h-auto font-bold text-(--light-pink) text-sm self-end"
            words={formatArray(message)}
          />
          <ChatBotIcon
            handleClick={() => {}}
            className={cn("size-8 bg-(--primary-teal) cursor-default", "")}
          />
        </div>
      )}
    </div>
  );
};
interface ChatBotProps {
  className?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  firstClick: boolean;
  setFirstClick: (firstClick: boolean) => void;
}

const ChatBot = ({
  className,
  open,
  setOpen,
  firstClick,
  setFirstClick,
}: ChatBotProps) => {
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [botLoading, setBotLoading] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  useOutsideClick(ref, () => setOpen(false));
  const handleClick = () => {
    if (firstClick) {
      setFirstClick(false);
    }
    setOpen(!open);
  };

  const handleMessageClicked = ({ botMessage }: { botMessage: string }) => {
    console.log("MESSAGE SUBMITTED", botMessage);
    const newClientMessage: ChatMessageType = {
      from: "client",
      message: botMessage,
    };
    setBotLoading(true);

    setChatMessages((prev) => [...prev, newClientMessage]);
  };

  useEffect(() => {
    setChatMessages([]);
  }, []);

  return (
    <div
      className={cn(
        "w-[50x] h-[40px] relative transition-all duration-500 ease-in-out transform",
        open ? "max-[800px]:w-[320px] w-[500px]" : "w-[50px]",
        className
      )}
      ref={ref}
    >
      <ChatBotIcon
        handleClick={handleClick}
        className={cn(
          "w-[40px] h-[40px] absolute top-0 z-2 transition-all duration-500 ease-in-out transform ",
          open
            ? "-rotate-290 max-[400px]:right-[260px] max-[468px]:right-[295px] max-[600px]:right-[330px] max-[800px]:right-[340px] right-[540px]"
            : "rotate-0 right-0"
        )}
      />
      <ChatBotIcon
        handleClick={handleClick}
        className={
          "w-[40px] h-[40px] absolute top-0 right-0 z-2 transition-all duration-500 ease-in-out transform " +
          (open
            ? "rotate-200 max-[400px]:right-[30px] max-[468px]:-right-[15px] max-[600px]:-right-[50px]"
            : "rotate-0")
        }
      />
      <div
        className={cn(
          "absolute overflow-hidden p-4 top-[20px] right-[20px] bg-(--primary-coral) rounded-tl-xl rounded-tr-xl rounded-sm transition-all duration-500 ease-in-out transform ",
          open
            ? " max-[400px]:w-[220px] max-[468px]:w-[320px] max-[600px]:w-[380px] max-[800px]:w-[340px] w-[540px] max-[400px]:right-[55px] max-[468px]:right-[0px] max-[600px]:-right-[30px] right[0px] h-[470px] [@media(max-height:665px)]:h-[275px] opacity-100"
            : "w-0 h-0 opacity-0",
          firstClick && "max-[400px]:h-40 h-24"
        )}
      >
        <div className="overflow-y-scroll w-full h-full no-scrollbar rounded-md p-2 flex flex-col gap-4">
          <Message
            from="bot"
            message="Hi! I'm your AI PIPA Broker - Ask me anything about pet insurance!"
            onClick={() => {
              if (firstClick) {
                setFirstClick(false);
              }
            }}
            className="cursor-pointer"
          />
          <div>
            <TypewriterEffect
              cursorClassName="hidden"
              className="h-auto font-bold text-(--light-pink) text-sm self-end mt-2"
              words={formatArray("Ask me questions such as:")}
            />
            <TypewriterEffect
              cursorClassName="hidden"
              className="h-auto font-bold text-(--light-pink) text-sm self-end mt-2"
              words={formatArray(
                "How much on average does it cost to insure a dog/cat?"
              )}
            />
            <TypewriterEffect
              cursorClassName="hidden"
              className="h-auto font-bold text-(--light-pink) text-sm self-end mt-2"
              words={formatArray(
                "What is a reimbursement rate?\nWhat are the most expensive breeds for a dog/cat?"
              )}
            />
            <TypewriterEffect
              cursorClassName="hidden"
              className="h-auto font-bold text-(--light-pink) text-sm self-end mt-2"
              words={formatArray(
                "Why are the premiums I see higher than the average pet insurance premium for a dog/cat?"
              )}
            />
          </div>
          {chatMessages.map((msg: ChatMessageType, index: number) => (
            <Message key={index} from={msg.from} message={msg.message} />
          ))}
          {botLoading && (
            <div className="flex flex-row justify-start items-center gap-2">
              <Message
                from="bot"
                message=""
                className="italic text-(--light-pink) opacity-70"
              />
              <Loader className="size-3" />
            </div>
          )}
          <hr className="size-0 mt-14" />
          <BotMessageForm
            onSubmit={handleMessageClicked}
            submitDisabled={botLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default ChatBot;
