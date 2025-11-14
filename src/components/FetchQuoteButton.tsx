import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const FetchQuoteButton = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/info");
  };
  return (
    <button
      className={cn(
        "nunito-sans-bold max-w-[200px] p-4 bg-(--primary-coral) cursor-pointer text-white border-none text-sm transition-transform duration-300 ease space-y-0.5 shadow-lg font-600 tracking-wide rounded-full hover:bg-(--primary-coral) hover:shadow-lg hover:transition-transform hover:duration-200 hover:ease hover:-translate-y-1 min-w-[150px] text-center",
        className
      )}
      onClick={handleClick}
    >
      Fetch Free Quotes
    </button>
  );
};

export default FetchQuoteButton;
