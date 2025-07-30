import { useNavigate } from "react-router-dom";
import FetchQuoteButton from "../FetchQuoteButton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface HeaderProps {
  showFetchButton?: boolean;
}

const DesktopHeader = ({ showFetchButton = true }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-(--light-pink) fixed top-0 left-0 right-0 z-100 h-24 shadow-md text-center flex items-center justify-center">
      <div className="flex max-w-[1200px] h-full px-4 items-center w-full justify-between">
        <a href="https://www.pipabroker.com" className="nunito-sans-medium">
          <img src="./logo.png" alt="PiPA Broker" className="max-h-20" />
        </a>
        <nav className="flex w-full gap-8 align-center justify-evenly max-w-[800px] ml-8">
          <div
            className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center"
            onClick={() => navigate("/about")}
          >
            About
          </div>
          <HoverCard>
            <HoverCardTrigger className="nunito-sans-medium flex items-center cursor-default text-center">
              Pet Insurance Resources
            </HoverCardTrigger>
            <HoverCardContent className="z-100 bg-(--light-pink) w-[300px]">
              <div className="flex flex-col gap-4 p-1">
                <button
                  onClick={() => {
                    navigate("/terminology");
                  }}
                  className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center justify-center text-(--text-dark) text-nowrap"
                >
                  Pet Insurance 101 - Terminology
                </button>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger className="nunito-sans-medium flex items-center cursor-default">
              Contact
            </HoverCardTrigger>
            <HoverCardContent className="z-100 bg-(--light-pink)">
              <div className="flex flex-col gap-4 p-1">
                <button
                  onClick={() => {
                    navigate("/partners");
                  }}
                  className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 text-(--text-dark)"
                >
                  Partners
                </button>
                <button
                  onClick={() => {
                    navigate("/investors");
                  }}
                  className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 text-(--text-dark)"
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
              className="-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center"
            >
              FAQs
            </button>

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

/* Header Styles */
// .header {
//   background: var(--light-pink);
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   z-index: 100;
// }

// .header-container {
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 1rem 2rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// }

// .header-container .navigation {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 2rem;
//   margin-left: 2rem;
// }

// .header-container .nav-link {
//   text-decoration: none;
//   color: var(--text-dark);
//   font-size: 12px;
//   transition: color 0.3s ease;
//   text-align: center;
// }
// @media (min-width: 950px) {
//   .header-container .nav-link {
//     font-size: 16px;
//   }
// }

// .header-container .nav-link:hover {
//   color: var(--primary-teal);
// }
// .logo-section {
//   display: flex;
//   align-items: center;
// }

// .logo {
//   height: 75px;
//   width: auto;
// }
