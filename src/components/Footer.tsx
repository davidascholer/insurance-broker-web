import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// interface FooterProps {
//   showFetchButton?: boolean;
// }

const Footer = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  /* Footer Styles */

  // .footer-content {
  // }

  // .footer-content .navigation {
  //   display: flex;
  //   align-items: center;
  //   gap: 2rem;
  // }

  // .footer-content .nav-link {
  // }

  // .footer-content .nav-link:hover {
  //   color: var(--coral-light);
  // }

  return (
    <footer
      className={cn(
        "bg-(--primary-teal-dark) sticky top-0 z-100 px-16 pb-2 pt-4",
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
              src="./pipa_text_white.png"
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
          <button
            onClick={() => {
              navigate("/partners");
            }}
            className="nunito-sans-medium cursor-pointer transition-transform duration-200 ease hover:-translate-y-0.5"
          >
            Partners
          </button>
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
        </nav>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col items-center justify-center gap-8 p-4">
        <p className="text-white text-sm text-center mt-2 mb-4">
          PIPA Broker, LLC (“PIPA Broker”), with its principal place of business
          in Seattle, Washington, is a licensed independent insurance broker.
          The information provided on this site has been developed by PIPA
          Broker for general informational and educational purposes. We do our
          best to ensure that this information is up-to-date and accurate. Any
          insurance policy premium quotes or ranges displayed are non-binding.
          The final insurance policy premium for any policy is determined by the
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
