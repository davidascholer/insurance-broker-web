// import PipaIcon from "./icons/PipaIcon";

const ChatBotIcon = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div>
      <div
        className="cursor-pointer bg-(--primary-coral) hover:bg-(--coral-light) transition-colors duration-300 rounded-t-full rounded-br-full w-12 h-12 flex items-center justify-center"
        onClick={handleClick}
      >
        {/* <PipaIcon className="w-[30px] h-[30px]" /> */}
      </div>
    </div>
  );
};
export default ChatBotIcon;
