import { Link, useNavigate } from "react-router-dom";
import FetchQuoteButton from "../FetchQuoteButton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface HeaderProps {
  showFetchButton?: boolean;
}

const DesktopHeader = ({ showFetchButton = true }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-(--light-pink) fixed top-0 left-0 right-0 z-100 h-24 shadow-md text-center flex items-center justify-center">
      <div className="flex max-w-[1200px] h-full px-4 items-center w-full justify-between">
        <Link to="/" className="sansita-regular cursor-pointer">
          <img src="./logo.png" alt="PIPA Broker" className="max-h-20" />
        </Link>
        <nav className="flex w-full gap-8 align-center justify-evenly max-w-[800px] ml-8">
          <div
            className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center"
            onClick={() => navigate("/about")}
          >
            About
          </div>
          <HoverCard>
            <HoverCardTrigger className="sansita-regular flex items-center cursor-default text-center">
              Pet Insurance Resources
            </HoverCardTrigger>
            <HoverCardContent className="z-100 bg-(--light-pink) w-[300px]">
              <div className="flex flex-col gap-4 p-1">
                <button
                  onClick={() => {
                    navigate("/terminology");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center justify-center text-(--text-dark) text-nowrap"
                >
                  Pet Insurance 101 - Terminology
                </button>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger className="sansita-regular flex items-center cursor-default">
              Contact
            </HoverCardTrigger>
            <HoverCardContent className="z-100 bg-(--light-pink)">
              <div className="flex flex-col gap-4 p-1">
                <button
                  onClick={() => {
                    navigate("/partners");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 text-(--text-dark)"
                >
                  Partners
                </button>
                <button
                  onClick={() => {
                    navigate("/investors");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 text-(--text-dark)"
                >
                  Investors
                </button>
              </div>
            </HoverCardContent>
          </HoverCard>

          <button
            onClick={() => {
              navigate("/faqs");
            }}
            className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center"
          >
            FAQs
          </button>

          {/* <button
            onClick={changeTheme}
            className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center"
          >
            Theme
          </button> */}

          {showFetchButton && (
            <div className="flex items-center justify-center">
              <FetchQuoteButton />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default DesktopHeader;
