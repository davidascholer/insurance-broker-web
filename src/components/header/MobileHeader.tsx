import { Link, useNavigate } from "react-router-dom";
import FetchQuoteButton from "../FetchQuoteButton";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  showFetchButton?: boolean;
  showChatBot?: boolean;
}

const MobileHeader = ({ showFetchButton = true }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourceLinkOpen, setResourceLinkOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isResourceMounted, setIsResourceMounted] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = useCallback(() => {
    setMenuOpen((prevOpen) => !prevOpen);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setResourceLinkOpen(false);
  }, []);

  const openResourceMenu = useCallback(() => {
    setResourceLinkOpen(true);
  }, []);

  const closeResourceMenu = useCallback(() => {
    setResourceLinkOpen(false);
  }, []);

  const handleNavigation = useCallback((path: string) => {
    closeMenu();
    navigate(path);
  }, [navigate, closeMenu]);

  // Handle menu mounting for animation
  useEffect(() => {
    if (menuOpen) {
      setIsMenuMounted(true);
    } else {
      // Delay unmounting to allow fade-out animation
      const timer = setTimeout(() => setIsMenuMounted(false), 400);
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

  // Handle resource menu mounting for animation
  useEffect(() => {
    if (resourceLinkOpen) {
      setIsResourceMounted(true);
    } else {
      const timer = setTimeout(() => setIsResourceMounted(false), 400);
      return () => clearTimeout(timer);
    }
  }, [resourceLinkOpen]);

  useEffect(() => {
    if (menuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      
      return () => {
        // Restore scroll position when menu closes
        const scrollY = document.body.style.top;
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    } else {
      setResourceLinkOpen(false);
    }
  }, [menuOpen]);

  return (
    <>
      <header className="bg-(--light-pink) fixed top-0 left-0 right-0 z-100 h-20 pointer-events-auto">
        <div className="flex h-full items-center align-middle p-4 max-w-[1200px] mx-auto">
          <div className="flex items-center">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="nav-link nunito-sans-medium cursor-pointer touch-manipulation"
              aria-label="Go to home page"
            >
              <img src="/logo.png" alt="PIPA Broker" className="h-16 pointer-events-none" />
            </button>
          </div>

          <button
            id="mobile-header-menu"
            onClick={handleMenuClick}
            className={cn(menuOpen ? "open" : "", "touch-manipulation")}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      {isMenuMounted && (
        <div
          className={cn(
            "fixed bg-(--light-pink) z-99 flex flex-col items-center w-screen top-20 bottom-0 min-h-screen overflow-y-auto overscroll-contain",
            menuOpen ? "animate-appear" : "animate-disappear"
          )}
          style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation menu"
          aria-hidden={!menuOpen}
        >
          <nav
            className={cn(
              "flex flex-col items-center flex-1 justify-start gap-8 nunito-sans-medium sansita-bold text-3xl transition-transform duration-200 ease-in-out p-6 w-full touch-manipulation",
              menuOpen ? "animate-slide-down" : "animate-slide-up"
            )}
          >
            <button
              className="cursor-pointer active:scale-95 transition-transform duration-150 ease-in-out touch-manipulation w-full text-center"
              onClick={openResourceMenu}
              type="button"
            >
              Pet Insurance Resources
            </button>
            <button
              className="cursor-pointer active:scale-95 transition-transform duration-150 ease-in-out touch-manipulation w-full text-center"
              onClick={() => handleNavigation("/faqs")}
              type="button"
            >
              FAQs
            </button>
            <button
              className="cursor-pointer active:scale-95 transition-transform duration-150 ease-in-out touch-manipulation w-full text-center"
              onClick={() => handleNavigation("/about-us")}
              type="button"
            >
              About Us
            </button>
            <Link
              to="mailto:admin@pipabroker.com"
              className="cursor-pointer active:scale-95 transition-transform duration-150 ease-in-out touch-manipulation w-full text-center"
              aria-label="Contact PIPA Broker via email"
              onClick={closeMenu}
            >
              Contact
            </Link>

            {showFetchButton && (
              <div onClick={closeMenu}>
                <FetchQuoteButton />
              </div>
            )}
          </nav>
        </div>
      )}
      {/* Resources Menu */}
      {isResourceMounted && (
        <div
          className={cn(
            "fixed bg-(--light-pink) z-100 flex flex-col items-center w-screen top-20 bottom-0 min-h-[400px] overflow-y-auto overscroll-contain",
            resourceLinkOpen ? "animate-appear" : "animate-disappear"
          )}
          style={{ pointerEvents: resourceLinkOpen ? 'auto' : 'none' }}
          role="dialog"
          aria-modal="true"
          aria-label="Pet insurance resources menu"
          aria-hidden={!resourceLinkOpen}
        >
          <nav
            className={cn(
              "flex flex-col items-center flex-1 justify-center gap-10 p-4 nunito-sans-medium sansita-bold text-2xl transition-transform duration-200 ease-in-out w-full touch-manipulation",
              resourceLinkOpen ? "animate-slide-down" : "animate-slide-up"
            )}
          >
            <button
              className="cursor-pointer active:scale-95 transition-transform duration-150 ease-in-out touch-manipulation w-full text-center"
              onClick={() => handleNavigation("/terminology")}
              type="button"
            >
              Pet Insurance 101 - Terminology
            </button>
            <button
              className="cursor-pointer active:scale-95 transition-transform duration-150 ease-in-out touch-manipulation w-full text-center"
              onClick={() => handleNavigation("/blog/what-is-pet-insurance")}
              type="button"
            >
              What is Pet Insurance and How It Works
            </button>
            <button
              className="cursor-pointer active:scale-95 transition-transform duration-150 ease-in-out touch-manipulation w-full text-center"
              onClick={() => handleNavigation("/blog/how-to-compare-pet-insurance-policies")}
              type="button"
            >
              How to Compare Pet Insurance Policies
            </button>
            <button
              className="cursor-pointer active:scale-95 transition-transform duration-150 ease-in-out touch-manipulation w-full text-center"
              onClick={() => handleNavigation("/blog/understanding-pet-insurance-types")}
              type="button"
            >
              Understanding Pet Insurance Types
            </button>
            <button
              className="cursor-pointer active:scale-95 transition-transform duration-150 ease-in-out touch-manipulation w-full text-center"
              onClick={() => handleNavigation("/blog/pet-insurance-exclusions")}
              type="button"
            >
              Pet Insurance Exclusions and Work Arounds
            </button>
            <button
              className="cursor-pointer active:scale-95 transition-transform duration-150 ease-in-out touch-manipulation w-full text-center"
              onClick={() => handleNavigation("/blog/how-much-does-pet-insurance-cost")}
              type="button"
            >
              How Much Does Pet Insurance Cost?
            </button>

            <button
              type="button"
              onClick={closeResourceMenu}
              className="cursor-pointer text-2xl bg-(--light-pink) nunito-sans-medium sansita-bold font-medium text-center flex flex-col items-center touch-manipulation active:scale-95 transition-transform duration-150"
              aria-label="Go back to main menu"
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
      )}
    </>
  );
};

export default MobileHeader;
