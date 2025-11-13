import { Link, useNavigate } from "react-router-dom";
import FetchQuoteButton from "../FetchQuoteButton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
// import { useContext } from "react";
// import AppThemeContext from "@/theme/AppThemeContext";

interface HeaderProps {
  showFetchButton?: boolean;
}

const DesktopHeader = ({ showFetchButton = true }: HeaderProps) => {
  const navigate = useNavigate();
  // const { changeTheme } = useContext(AppThemeContext);

  return (
    <header
      className="bg-(--light-pink) dark:bg-(--primary-teal-dark) fixed top-0 left-0 right-0 z-100 h-24 shadow-md text-center flex items-center justify-center"
      role="banner"
      aria-label="Main navigation header"
    >
      <div className="flex max-w-5xl h-full px-4 items-center w-full justify-start gap-8 xl:text-lg">
        <Link
          to="/"
          className="sansita-regular cursor-pointer w-32"
          aria-label="Go to Pipa Broker homepage"
        >
          <img
            src="/logo.png"
            alt="PIPA Broker logo - Pet insurance made simple"
            className="max-h-20"
          />
        </Link>
        <nav
          className="flex gap-8 w-full flex-1"
          role="navigation"
          aria-label="Main navigation menu"
        >
          <HoverCard>
            <HoverCardTrigger
              className="sansita-regular flex items-center cursor-default text-center font-bold"
              aria-label="Pet Insurance Resources menu"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Pet Insurance Resources
            </HoverCardTrigger>
            <HoverCardContent
              className="z-100 bg-(--light-pink) w-[320px]"
              role="menu"
              aria-label="Pet Insurance Resources submenu"
            >
              <div className="flex flex-col gap-4 p-1 justify-start items-start">
                <button
                  onClick={() => {
                    navigate("/terminology");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center justify-center text-(--text-dark) text-nowrap"
                  role="menuitem"
                  aria-label="Navigate to Pet Insurance 101 Terminology page"
                >
                  Pet Insurance 101 - Terminology
                </button>
                <button
                  onClick={() => {
                    navigate("/blog/what-is-pet-insurance");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center justify-center text-(--text-dark) text-nowrap"
                  role="menuitem"
                  aria-label="Navigate to What is Pet Insurance and How It Works page"
                >
                  What is Pet Insurance and How It Works
                </button>
                <button
                  onClick={() => {
                    navigate("/blog/why-consider-pet-insurance");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center justify-center text-(--text-dark) text-nowrap"
                  role="menuitem"
                  aria-label="Navigate to Why Consider Pet Insurance page"
                >
                  Why Consider Pet Insurance
                </button>
                <button
                  onClick={() => {
                    navigate("/blog/how-to-compare-pet-insurance-policies");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center justify-center text-(--text-dark) text-nowrap"
                  role="menuitem"
                  aria-label="Navigate to How To Compare Pet Insurance Policies page"
                >
                  How To Compare Pet Insurance Policies
                </button>
                <button
                  onClick={() => {
                    navigate("/blog/understanding-pet-insurance-types");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center justify-center text-(--text-dark) text-nowrap"
                  role="menuitem"
                  aria-label="Navigate to Understanding Pet Insurance Types page"
                >
                  Understanding Pet Insurance Types
                </button>
                <button
                  onClick={() => {
                    navigate("/blog/pet-insurance-exclusions");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center justify-center text-(--text-dark) text-nowrap"
                  role="menuitem"
                  aria-label="Navigate to Pet Insurance Exclusions and Work Arounds page"
                >
                  Pet Insurance Exclusions and Work Arounds
                </button>
                <button
                  onClick={() => {
                    navigate("/blog/how-much-does-pet-insurance-cost");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center justify-center text-(--text-dark) text-nowrap"
                  role="menuitem"
                  aria-label="Navigate to How Much Does Pet Insurance Cost page"
                >
                  How Much Does Pet Insurance Cost
                </button>
              </div>
            </HoverCardContent>
          </HoverCard>

          <button
            onClick={() => {
              navigate("/faqs");
            }}
            className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center font-bold"
            aria-label="Navigate to Frequently Asked Questions page"
          >
            FAQs
          </button>
          <button
            className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center font-bold text-nowrap"
            onClick={() => navigate("/about")}
            aria-label="Navigate to about page"
          >
            About Us
          </button>
          {/* <button
            onClick={changeTheme}
            className="nansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 flex items-center hidden"
            aria-label="Toggle between light and dark theme"
          >
            Theme
          </button> */}

          <a
            href="mailto:EMAILADDRESS"
            className="flex flex-row flex-nowrap items-center gap-2 pointer-cursor ml-auto"
            aria-label="Contact menu"
          >
            <span className="sansita-regular flex items-center ml-auto font-bold">
              Contact
            </span>
            <img
              src="/icons/email_icon.svg"
              alt="Contact Icon"
              className="w-10"
            />
          </a>

          {/* <HoverCard>
            <HoverCardTrigger
              className="sansita-regular flex items-center cursor-default ml-auto"
              aria-label="Contact menu"
              aria-haspopup="true"
              aria-expanded="false"
              asChild
            >
              <div className="flex flex-row flex-nowrap items-center gap-2">
                <span className="font-bold">Contact</span>
                <img
                  src="/icons/email_icon.svg"
                  alt="Contact Icon"
                  className="w-10"
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent
              className="z-100 bg-(--light-pink) w-[160px]"
              role="menu"
              aria-label="Contact submenu"
            >
              <div className="flex flex-col gap-4 p-1 items-start">
                <button
                  onClick={() => {
                    navigate("/partners");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 text-(--text-dark)"
                  role="menuitem"
                  aria-label="Navigate to Partners contact page"
                >
                  Partners
                </button>
                <button
                  onClick={() => {
                    navigate("/investors");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 text-(--text-dark)"
                  role="menuitem"
                  aria-label="Navigate to Investors contact page"
                >
                  Investors
                </button>
              </div>
            </HoverCardContent>
          </HoverCard> */}

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
