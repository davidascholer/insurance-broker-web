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
          <img src="/logo.png" alt="PiPA Broker" className="logo" />
        </div>
        
        {showNavigation && (
          <nav className="navigation">
            <a href="#" className="nav-link nunito-sans-medium" onClick={(e) => { e.preventDefault(); navigate('/') }}>Home</a>
            <a href="#" className="nav-link nunito-sans-medium">About</a>
            <a href="#" className="nav-link nunito-sans-medium">FAQs</a>
            <button className="btn-primary" onClick={() => navigate('/results')}>Fetch A Quote</button>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header