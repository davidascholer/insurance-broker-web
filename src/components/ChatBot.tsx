import { cn, formatArray, generateRandomAlphanumeric } from "@/lib/utils";
import ChatBotIcon from "./ChatBotIcon";
import { TypewriterEffect } from "./ui/TypewriterEffect";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import type { ChatMessageType } from "@/lib/types";
import BotMessageForm from "./BotMessageForm";
import Loader from "./Loader";
import { chatWithBot } from "@/api/api";
import { Button } from "./ui/button";

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
        "flex flex-row gap-4 justify-center items-start sansita-regular z-100",
        className
      )}
      onClick={onClick}
    >
      {from === "bot" ? (
        <div className="flex flex-row gap-2 items-start justify-baseline w-full">
          <ChatBotIcon
            handleClick={() => {}}
            className={cn(
              "size-6 bg-(--primary-teal-dark) cursor-default",
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
            className={cn("size-6 bg-(--primary-teal) cursor-default", "")}
          />
        </div>
      )}
    </div>
  );
};

const QuestionButton = ({ msg }: { msg: string }) => {
  const handleClick = () => {
    const formInput = document.getElementById(
      "bot-comment-box"
    ) as HTMLTextAreaElement;

    if (formInput) {
      console.log("Setting form input to:", msg);
      console.log(formInput);
      formInput.value = msg;
      formInput.focus();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="pointer-events-none"
      // className="border-(--primary-teal-dark) border-2 hover:bg-(--primary-coral)  transition-colors duration-300 ease-in-out cursor-pointer px-4 pt-1 pb-2 rounded-full text-sm mt-2 nunito-sans-bold "
    >
      <TypewriterEffect
        cursorClassName="hidden"
        className="h-auto font-bold text-sm self-end mt-2 "
        words={formatArray(msg)}
      />
    </button>
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>(
    localStorage.getItem("pipaChat")
      ? JSON.parse(localStorage.getItem("pipaChat") as string)
      : []
  );
  const [botLoading, setBotLoading] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  useOutsideClick(ref, () => setOpen(false));
  const handleClick = () => {
    if (firstClick) {
      setFirstClick(false);
    }
    setOpen(!open);
  };
  const sessionId =
    localStorage.getItem("pipaChatSessionId") || generateRandomAlphanumeric(9);

  const handleMessageClicked = async ({
    botMessage,
  }: {
    botMessage: string;
  }) => {
    const clientChatMessage: ChatMessageType = {
      from: "client",
      message: botMessage,
    };
    setChatMessages((prev) => [...prev, clientChatMessage]);
    setBotLoading(true);
    const newBotMessage = await chatWithBot({
      message: botMessage,
      sessionId: sessionId,
    });

    if (!newBotMessage.success) {
      const errorMessage: ChatMessageType = {
        from: "bot",
        message: `Sorry, I am having trouble responding right now. (${newBotMessage.msg})`,
      };
      setChatMessages((prev) => [...prev, errorMessage]);
      setBotLoading(false);
      return;
    }

    const botChatMessage: ChatMessageType = {
      from: "bot",
      message: newBotMessage.msg,
    };
    setBotLoading(false);
    setChatMessages((prev) => [...prev, botChatMessage]);
  };

  useEffect(() => {
    const savedMessaged = localStorage.getItem("pipaChat");
    const messages = savedMessaged ? JSON.parse(savedMessaged) : [];
    setChatMessages(messages);
  }, []);

  useEffect(() => {
    // Save to local storage
    localStorage.setItem("pipaChatSessionId", sessionId);
  }, [sessionId]);

  useEffect(() => {
    // Save to local storage
    localStorage.setItem("pipaChat", JSON.stringify(chatMessages));
  }, [chatMessages]);

  const handleClearChat = () => {
    setChatMessages([]);
    localStorage.removeItem("pipaChat");
    localStorage.setItem("pipaChatSessionId", generateRandomAlphanumeric(9));
  };

  return (
    <div
      className={cn(
        "w-[50x] h-[40px] relative transition-all duration-500 ease-in-out transform important-z",
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
          "absolute overflow-hidden p-2 top-[20px] right-[20px] bg-(--coral-light) rounded-tl-xl rounded-tr-xl rounded-sm transition-all duration-500 ease-in-out transform z-100",
          open
            ? " max-[400px]:w-[220px] max-[468px]:w-[320px] max-[600px]:w-[380px] max-[800px]:w-[340px] w-[540px] max-[400px]:right-[55px] max-[468px]:right-[0px] max-[600px]:-right-[30px] right[0px] h-[470px] [@media(max-height:665px)]:h-[275px] opacity-100"
            : "w-0 h-0 opacity-0",
          firstClick && "max-[400px]:h-24 h-16"
        )}
      >
        <div
          className="overflow-y-scroll w-full h-full no-scrollbar rounded-md p-2 flex flex-col gap-4"
          ref={scrollRef}
        >
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
            <QuestionButton msg="How much on average does it cost to insure a dog/cat?" />
            <QuestionButton msg="What are the most expensive breeds for a dog/cat?" />
            <QuestionButton msg="What is a reimbursement rate?" />
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
            scrollRef={scrollRef}
          />
          <Button
            className="nunito-sans-bold cursor-pointer mx-auto text-(--primary-teal-dark) hover:text-(--primary-teal)"
            onClick={handleClearChat}
            variant={"ghost"}
          >
            Clear Chat
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ChatBot;
