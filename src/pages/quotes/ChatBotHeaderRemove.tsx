/*
Keeping this for reference until positive it's not needed.
*/
// import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const BotMessage = ({ message }: { message: string }) => {
  return (
    <div className="m-4 justify-self-start mt-10">
      <span className="p-4 bg-white rounded-t-full rounded-bl-full">
        {message}
      </span>
    </div>
  );
};
const ClientMessage = ({ message }: { message: string }) => {
  return (
    <div className="m-4 justify-self-end mt-10">
      <span className="p-4 bg-white rounded-b-full rounded-tr-full">
        {message}
      </span>
    </div>
  );
};

const ChatbotHeader = () => {
  const [botHidden, setBotHidden] = useState(true);
  const modal = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // const handleBotClick = () => {
  //   setBotHidden((prev) => !prev);
  // };

  const handleHideModal = () => {
    setBotHidden(true);
  };

  return (
    <>
      <div
        ref={modal}
        className={`fixed left-0 right-0 top-0 overflow-hidden z-10 transition-all duration-500 ease-in-out bg-(--primary-coral-transparent) ${
          botHidden ? "h-0" : "h-screen "
        }`}
      >
        <div className="p-4 mt-20 gap-4 h-full w-full flex flex-col items-center justify-start">
          <Textarea
            placeholder="Type your message here."
            className="bg-white"
          />
          <div className="flex flex-row gap-4 w-full max-w-2xl justify-center">
            <Button
              variant="default"
              className="flex-10 text-(--primary-teal-dark) bg-white hover:bg-neutral-50 p-2 rounded-xl border border-(--primary-coral) hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-200 ease flex items-center justify-center cursor-pointer"
              onClick={() => {}}
            >
              Submit
            </Button>
            <Button
              variant="default"
              className="flex-1 text-(--primary-teal-dark) bg-white hover:bg-neutral-50 p-4 rounded-xl border border-(--primary-coral) hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-200 ease flex items-center justify-center cursor-pointer"
              onClick={handleHideModal}
            >
              Close Chat
            </Button>
          </div>
          <ScrollArea className="flex flex-col gap-2 h-full w-full max-w-2xl p-4 overflow-scroll no-scrollbar items-center justify-center pb-20">
            <BotMessage message="Hello from bot!" />
            <ClientMessage message="Hello from client!" />
            <BotMessage message="Response from bot." />
            <ClientMessage message="etc..." />
            <BotMessage message="Hello from bot!" />
            <ClientMessage message="Hello from client!" />
            <BotMessage message="Response from bot." />
            <ClientMessage message="etc..." />
            <BotMessage message="Hello from bot!" />
            <ClientMessage message="Hello from client!" />
            <BotMessage message="Response from bot." />
            <ClientMessage message="etc..." />
            <BotMessage message="Hello from bot!" />
            <ClientMessage message="Hello from client!" />
            <BotMessage message="Response from bot." />
            <ClientMessage message="etc..." />
            <BotMessage message="Hello from bot!" />
            <ClientMessage message="Hello from client!" />
            <BotMessage message="Response from bot." />
            <ClientMessage message="etc..." />
            <BotMessage message="Hello from bot!" />
            <ClientMessage message="Hello from client!" />
            <BotMessage message="Response from bot." />
            <ClientMessage message="etc..." />
            <BotMessage message="Hello from bot!" />
            <ClientMessage message="Hello from client!" />
            <BotMessage message="Response from bot." />
            <ClientMessage message="etc..." />
            <BotMessage message="Hello from bot!" />
            <ClientMessage message="Hello from client!" />
            <BotMessage message="Response from bot." />
            <ClientMessage message="etc..." />
            <BotMessage message="Hello from bot!" />
            <ClientMessage message="Hello from client!" />
            <BotMessage message="Response from bot." />
            <ClientMessage message="end" />
          </ScrollArea>
        </div>
      </div>
      <header className="z-20 w-full mb-4 shadow-md fixed top-0 left-0 bg-white p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto h-12">
          <button onClick={() => navigate("/")} className="nunito-sans-medium cursor-pointer">
            <img
              src="./logo.png"
              alt="PIPA Broker"
              className="w-[120px] aspect-8/3"
            />
          </button>
          {/* <ChatBot handleClick={handleBotClick} /> */}
        </div>
      </header>
    </>
  );
};
export default ChatbotHeader;
