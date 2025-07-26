import { useNavigate } from "react-router-dom";
import FetchQuoteButton from "./FetchQuoteButton";

interface FooterProps {
  showFetchButton?: boolean;
}

const Footer = ({ showFetchButton = true }: FooterProps) => {
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
              className="logo"
            />
          </a>
        </div>

        <nav className="navigation">
          {/* New implementation. Uncomment when ready */}
          {/* <button onClick={()=>{navigate("/")}} className="nav-link nunito-sans-medium link-btn">Home</button>
          <button onClick={()=>{navigate("/about")}} className="nav-link nunito-sans-medium link-btn">About</button>
          <button onClick={()=>{navigate("/terminology")}} className="nav-link nunito-sans-medium link-btn">Pet Insurance Resources</button>
          <button onClick={()=>{navigate("/partners")}} className="nav-link nunito-sans-medium link-btn">Contact</button>
          <button onClick={()=>{navigate("/faqs")}} className="nav-link nunito-sans-medium link-btn">FAQs</button> */}
          {/* Old implementation. Replace with above when ready */}
          <a
            href="https://www.pipabroker.com/faqs"
            className="nav-link nunito-sans-medium"
          >
            FAQs
          </a>
          <a
            href="https://www.pipabroker.com/partners"
            className="nav-link nunito-sans-medium"
          >
            Partners
          </a>
          <a
            href="https://www.pipabroker.com/investors"
            className="nav-link nunito-sans-medium"
          >
            Investors
          </a>
        </nav>
      </div>
      <span>© Copyright 2025 PIPA. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
