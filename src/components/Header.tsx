import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  showNavigation?: boolean
}

const Header = ({ showNavigation = false }: HeaderProps) => {
  const navigate = useNavigate()
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <a href="https://www.pipabroker.com" className="nav-link nunito-sans-medium">
            <img src="./logo.png" alt="PiPA Broker" className="logo" />
          </a>
        </div>
        
        {showNavigation && (
          <nav className="navigation">
            <a href="https://www.pipabroker.com" className="nav-link nunito-sans-medium">Home</a>
            <a href="https://www.pipabroker.com/about" className="nav-link nunito-sans-medium">About</a>
            <a href="https://www.pipabroker.com/faqs" className="nav-link nunito-sans-medium">FAQs</a>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header