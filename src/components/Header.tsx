import { useNavigate } from "react-router-dom";
import FetchQuoteButton from "./FetchQuoteButton";

interface HeaderProps {
  showFetchButton?: boolean;
}

const Header = ({ showFetchButton = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <a
            href="https://www.pipabroker.com"
            className="nav-link nunito-sans-medium"
          >
            <img src="./logo.png" alt="PiPA Broker" className="logo" />
          </a>
        </div>

        {/* Leave this in here for now until we finalize the design */}
        <nav className="navigation">
          <button onClick={()=>{navigate("/")}} className="nav-link nunito-sans-medium">Home</button>
          {/* <a
            href="https://www.pipabroker.com"
            className="nav-link nunito-sans-medium"
          >
            Home
          </a>
          <a
            href="https://www.pipabroker.com/about"
            className="nav-link nunito-sans-medium"
          >
            About
          </a>
          <a
            href="https://www.pipabroker.com/about"
            className="nav-link nunito-sans-medium"
          >
            Pet Insurance Resources
          </a>
          <a
            href="https://www.pipabroker.com/about"
            className="nav-link nunito-sans-medium"
          >
            Contact
          </a>
          <a
            href="https://www.pipabroker.com/faqs"
            className="nav-link nunito-sans-medium"
          >
            FAQs
          </a> */}
          {showFetchButton && <FetchQuoteButton />}
        </nav>
      </div>
    </header>
  );
};

export default Header;
