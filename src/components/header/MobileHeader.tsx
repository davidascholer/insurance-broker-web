import { useNavigate } from "react-router-dom";
import FetchQuoteButton from "../FetchQuoteButton";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  showFetchButton?: boolean;
}

const MobileHeader = ({ showFetchButton = true }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <header className="bg-(--light-pink) fixed top-0 left-0 right-0 z-100 h-20">
        <div className="flex h-full items-center align-middle p-4 max-w-[1200px] mx-auto">
          <div className="flex items-center">
            <a
              href="https://www.pipabroker.com"
              className="nav-link nunito-sans-medium"
            >
              <img src="./logo.png" alt="PiPA Broker" className="h-16" />
            </a>
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
          menuOpen ? "animate-fade-in" : "animate-fade-out"
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
              navigate("/terminology");
            }}
          >
            Pet Insurance Resources
          </button>
          <button
            className="cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in-out"
            onClick={() => {
              navigate("/partners");
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
    </>
  );
};

export default MobileHeader;
