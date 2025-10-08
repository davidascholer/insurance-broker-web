import { cn } from "@/lib/utils";
import { Facebook, Instagram } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

// interface FooterProps {
//   showFetchButton?: boolean;
// }

const Footer = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <footer
      className={cn(
        "bg-(--primary-teal-dark) sticky top-0 z-100 px-8 pb-2 pt-4",
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto p-4 flex items-center justify-between">
        <div>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="nav-link nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
          >
            <img
              src="/pipa_text_white.png"
              alt="PIPA Broker"
              className="w-32 mb-2"
            />
          </button>
        </div>

        <nav className="navigation flex flex-row flex-wrap items-center gap-4 px-6 text-(--primary-coral) flex-1 justify-evenly">
          <button
            onClick={() => {
              navigate("/faqs");
            }}
            className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
          >
            FAQs
          </button>

          <HoverCard>
            <HoverCardTrigger
              className="nunito-sans-medium cursor-default transition-transform duration-200 ease hover:-translate-y-0.5"
              aria-label="Contact menu"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Partners
            </HoverCardTrigger>
            <HoverCardContent
              className="z-100 bg-(--light-pink) w-[160px]"
              role="menu"
              aria-label="Contact submenu"
            >
              <div className="flex flex-col gap-4 p-1 items-start">
                <Link
                  to="https://www.prudentpet.com/"
                  target="_blank"
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 text-(--text-dark)"
                  role="menuitem"
                  aria-label="Navigate to PrudentPet.com"
                >
                  Prudent Pet
                </Link>
                <Link
                  to="https://www.kanguroseguro.com/"
                  target="_blank"
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 text-(--text-dark)"
                  role="menuitem"
                  aria-label="Navigate to KanguroSeguro.com"
                >
                  Kanguro
                </Link>
                <button
                  onClick={() => {
                    navigate("/partners");
                  }}
                  className="sansita-regular cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5 text-(--text-dark)"
                  role="menuitem"
                  aria-label="Navigate to Partners contact page"
                >
                  Contact
                </button>
              </div>
            </HoverCardContent>
          </HoverCard>

          <button
            onClick={() => {
              navigate("/investors");
            }}
            className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
          >
            Investors
          </button>
          <button
            onClick={() => {
              navigate("/terms");
            }}
            className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
          >
            Terms
          </button>
          <button
            onClick={() => {
              navigate("/privacy");
            }}
            className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
          >
            Privacy
          </button>
          <button
            onClick={() => {
              navigate("/licenses");
            }}
            className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
          >
            Licenses
          </button>
          <div className="w-full flex justify-center items-center mt-4 gap-10">
            <Link
              to="https://www.facebook.com/profile.php?id=61579696327519"
              target="_blank"
              className="sansita-regular cursor-pointer nunito-sans-medium transition-transform duration-200 ease hover:-translate-y-0.5"
            >
              <Facebook className="inline-block mb-1 mr-1" size={24} />
            </Link>
            <Link
              to="https://www.instagram.com/pipabroker/"
              target="_blank"
              className="sansita-regular cursor-pointer nunito-sans-medium transition-transform duration-200 ease hover:-translate-y-0.5"
            >
              <Instagram className="inline-block mb-1 mr-1" size={24} />
            </Link>
          </div>
        </nav>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col items-center justify-center gap-8 p-4">
        <p className="text-white text-sm text-center mt-2 mb-4">
          PIPA Broker, LLC (“PIPA Broker”), with its principal place of business
          in Seattle, Washington, is a licensed independent insurance broker.
          PIPA Broker conducts business as Insurance Services by PIPA in the
          following states: California; West Virginia. The information provided
          on this site has been developed by PIPA Broker for general
          informational and educational purposes. We do our best to ensure that
          this information is up-to-date and accurate. Any insurance policy
          premium quotes or ranges displayed are non-binding. The final
          insurance policy premium for any policy is determined by the
          underwriting insurance company following application.
        </p>
        <span className="text-sm text-white text-center">
          © Copyright 2025 PIPA Broker, LLC. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
