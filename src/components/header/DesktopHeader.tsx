import { useNavigate } from "react-router-dom";
import FetchQuoteButton from "../FetchQuoteButton";

interface HeaderProps {
  showFetchButton?: boolean;
}

const DesktopHeader = ({ showFetchButton = true }: HeaderProps) => {
  const navigate = useNavigate();

  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.toggle("open");
  };

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

        <nav className="navigation">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="nav-link nunito-sans-medium link-btn"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate("/about");
            }}
            className="nav-link nunito-sans-medium link-btn"
          >
            About
          </button>
          <button
            onClick={() => {
              navigate("/terminology");
            }}
            className="nav-link nunito-sans-medium link-btn"
          >
            Pet Insurance Resources
          </button>
          <button
            onClick={() => {
              navigate("/partners");
            }}
            className="nav-link nunito-sans-medium link-btn"
          >
            Contact
          </button>
          <button
            onClick={() => {
              navigate("/faqs");
            }}
            className="nav-link nunito-sans-medium link-btn"
          >
            FAQs
          </button>
          {showFetchButton && <FetchQuoteButton />}
        </nav>
      </div>
    </header>
  );
};

export default DesktopHeader;
