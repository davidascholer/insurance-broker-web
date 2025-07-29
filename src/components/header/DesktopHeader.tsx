import { useNavigate } from "react-router-dom";
import FetchQuoteButton from "../FetchQuoteButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  showFetchButton?: boolean;
}

const DesktopHeader = ({ showFetchButton = true }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-(--light-pink) fixed top-0 left-0 right-0 z-100 h-24 shadow-md">
      <div className="flex max-w-[1200px] h-full px-4 items-center w-full">
        <a href="https://www.pipabroker.com" className="nunito-sans-medium">
          <img src="./logo.png" alt="PiPA Broker" className="max-h-20" />
        </a>
        <NavigationMenu className="w-full max-w-[1200px] flex px-4">
          <NavigationMenuList className="p-0 m-0 max-w-[1200px] w-full justify-end gap-8">
            <NavigationMenuItem
              className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
              onClick={() => navigate("/")}
            >
              Home
            </NavigationMenuItem>
            <NavigationMenuItem
              className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
              onClick={() => navigate("/about")}
            >
              About
            </NavigationMenuItem>
            <NavigationMenuItem className="bg-transparent border-none">
              <NavigationMenuTrigger className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5">
                Pet Insurance Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-(--light-pink) p-2 rounded-md shadow-lg w-full">
                <NavigationMenuLink>
                  <button
                    onClick={() => {
                      navigate("/terminology");
                    }}
                    className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
                  >
                    Pet Insurance 101 - Terminology
                  </button>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="bg-transparent border-none">
              <NavigationMenuTrigger className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5">
                Contact
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-(--light-pink) p-2 rounded-md shadow-lg w-[500px]">
                <NavigationMenuLink>
                  <button
                    onClick={() => {
                      navigate("/partners");
                    }}
                    className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
                  >
                    Partners
                  </button>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <button
                    onClick={() => {
                      navigate("/investors");
                    }}
                    className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
                  >
                    Investors
                  </button>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <button
                onClick={() => {
                  navigate("/faqs");
                }}
                className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
              >
                FAQs
              </button>
            </NavigationMenuItem>

            {showFetchButton && (
              <NavigationMenuItem>
                <FetchQuoteButton />
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
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
