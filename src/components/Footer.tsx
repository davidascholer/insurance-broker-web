import { useNavigate } from "react-router-dom";

// interface FooterProps {
//   showFetchButton?: boolean;
// }

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div>
          <a
            href="https://www.pipabroker.com"
            className="nav-link nunito-sans-medium"
          >
            <img
              src="./pipa_text_white.png"
              alt="PiPA Broker"
              className="w-32 mb-2"
            />
          </a>
        </div>

        <nav className="navigation flex flex-row flex-wrap justify-center items-center gap-4 p-2">
          <button
            onClick={() => {
              navigate("/faqs");
            }}
            className="nunito-sans-medium cursor-pointer"
          >
            FAQs
          </button>
          <button
            onClick={() => {
              navigate("/partners");
            }}
            className="nunito-sans-medium cursor-pointer"
          >
            Partners
          </button>
          <button
            onClick={() => {
              navigate("/investors");
            }}
            className="nunito-sans-medium cursor-pointer"
          >
            Investors
          </button>
          <button
            onClick={() => {
              navigate("/terms");
            }}
            className="nunito-sans-medium cursor-pointer"
          >
            Terms
          </button>
          <button
            onClick={() => {
              navigate("/privacy");
            }}
            className="nunito-sans-medium cursor-pointer"
          >
            Privacy
          </button>
          <button
            onClick={() => {
              navigate("/licenses");
            }}
            className="nunito-sans-medium cursor-pointer"
          >
            Licenses
          </button>
        </nav>
      </div>
      <hr className="w-full" />
      <p className="text-white text-sm text-center mt-2 mb-4">
        PIPA Broker, LLC (“PIPA Broker”), with its principal place of business
        in Seattle, Washington, is a licensed independent insurance broker. The
        information provided on this site has been developed by PIPA Broker for
        general informational and educational purposes. We do our best to ensure
        that this information is up-to-date and accurate. Any insurance policy
        premium quotes or ranges displayed are non-binding. The final insurance
        policy premium for any policy is determined by the underwriting
        insurance company following application.
      </p>
      <span className="text-xl">© Copyright 2025 PIPA. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
