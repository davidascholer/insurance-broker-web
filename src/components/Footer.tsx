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
              className="w-32 mb-2"
            />
          </a>
        </div>

        <nav className="navigation">
          <button onClick={()=>{navigate("/faqs")}} className="nunito-sans-medium cursor-pointer">FAQs</button>
          <button onClick={()=>{navigate("/partners")}} className="nunito-sans-medium cursor-pointer">Partners</button>
          <button onClick={()=>{navigate("/investors")}} className="nunito-sans-medium cursor-pointer">Investors</button>
        </nav>
      </div>
      <span>© Copyright 2025 PIPA. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
