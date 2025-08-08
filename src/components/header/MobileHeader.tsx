import { useNavigate } from "react-router-dom";
import FetchQuoteButton from "../FetchQuoteButton";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  showFetchButton?: boolean;
}

const MobileHeader = ({ showFetchButton = true }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resoureLinkOpen, setResoureLinkOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <header className="bg-(--light-pink) fixed top-0 left-0 right-0 z-100 h-20">
        <div className="flex h-full items-center align-middle p-4 max-w-[1200px] mx-auto">
          <div className="flex items-center">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="nav-link nunito-sans-medium cursor-pointer"
            >
              <img src="./logo.png" alt="PiPA Broker" className="h-16" />
            </button>
          </div>

          <button
            id="mobile-header-menu"
            onClick={handleMenuClick}
            className={cn(menuOpen ? "open" : "")}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <div
        className={cn(
          "fixed bg-(--light-pink) z-99 flex flex-col items-center w-screen top-20 bottom-0 min-h-[400px]",
          menuOpen ? "animate-appear" : "animate-disappear"
        )}
      >
        <nav
          className={cn(
            "flex flex-col items-center flex-1 justify-evenly nunito-sans-medium sansita-bold text-4xl transition-transform duration-200 ease-in-out",
            menuOpen ? "animate-slide-down" : "animate-slide-up"
          )}
        >
          <button
            className="cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
          <button
            className="cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            onClick={() => {
              navigate("/about");
            }}
          >
            About
          </button>
          <button
            className="cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            onClick={() => {
              setResoureLinkOpen(true);
            }}
          >
            Pet Insurance Resources
          </button>
          <button
            className="cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            onClick={() => {
              setContactOpen(true);
            }}
          >
            Contact
          </button>
          <button
            className="cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            onClick={() => {
              navigate("/faqs");
            }}
          >
            FAQs
          </button>
          {showFetchButton && <FetchQuoteButton />}
        </nav>
      </div>
      {/* Resources Menu */}
      <div
        className={cn(
          "fixed bg-(--light-pink) z-99 flex flex-col items-center w-screen top-20 bottom-0 min-h-[400px]",
          resoureLinkOpen ? "animate-appear" : "animate-disappear"
        )}
      >
        <nav
          className={cn(
            "flex flex-col items-center flex-1 justify-center gap-10 nunito-sans-medium sansita-bold text-4xl transition-transform duration-200 ease-in-out",
            resoureLinkOpen ? "animate-slide-down" : "animate-slide-up"
          )}
        >
          <button
            className="cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            onClick={() => {
              navigate("/terminology");
            }}
          >
            Pet Insurance 101 - Terminology
          </button>

          <button
            type="button"
            onClick={() => {
              setResoureLinkOpen(false);
            }}
            className="cursor-pointer text-2xl bg-(--light-pink) nunito-sans-medium sansita-bold font-medium text-center flex flex-col items-center "
          >
            <svg
              className="w-14 h-14 mt-8"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
          </button>
        </nav>
      </div>
      {/* Contact Menu */}
      <div
        className={cn(
          "fixed bg-(--light-pink) z-99 flex flex-col items-center w-screen top-20 bottom-0 min-h-[400px]",
          contactOpen ? "animate-appear" : "animate-disappear"
        )}
      >
        <nav
          className={cn(
            "flex flex-col items-center flex-1 justify-center gap-10 nunito-sans-medium sansita-bold text-4xl transition-transform duration-200 ease-in-out",
            contactOpen ? "animate-slide-down" : "animate-slide-up"
          )}
        >
          <button
            className="cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            onClick={() => {
              navigate("/partners");
            }}
          >
            Partners
          </button>
          <button
            className="cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            onClick={() => {
              navigate("/investors");
            }}
          >
            Investors
          </button>
          <button
            type="button"
            onClick={() => {
              setContactOpen(false);
            }}
            className="cursor-pointer text-2xl bg-(--light-pink) nunito-sans-medium sansita-bold font-medium text-center flex flex-col items-center "
          >
            <svg
              className="w-14 h-14 mt-8"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h14M5 12l4-4m-4 4 4 4"
              />
            </svg>
          </button>
        </nav>
      </div>
    </>
  );
};

export default MobileHeader;
