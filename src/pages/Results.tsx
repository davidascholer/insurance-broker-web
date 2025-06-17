import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

interface InsuranceProvider {
  id: number
  name: string
  logo: string
  monthlyPrice: number
  yearlyPrice: number
  description: string
  features: string[]
}

const Results = () => {
  const navigate = useNavigate()

  const mockResults: InsuranceProvider[] = [
    {
      id: 1,
      name: "PetGuard Pro",
      logo: "🛡️",
      monthlyPrice: 45,
      yearlyPrice: 486,
      description: "Get quotes from America's top pet insurance carriers right on your phone or desktop.",
      features: ["24/7 Vet Support", "Emergency Coverage", "Prescription Drugs", "Preventive Care"]
    },
    {
      id: 2,
      name: "FurryFriend Insurance",
      logo: "🐾",
      monthlyPrice: 40,
      yearlyPrice: 432,
      description: "Compare pet insurance quotes without the hassle of visiting several different sites.",
      features: ["Quick Claims", "Multi-Pet Discounts", "Hereditary Conditions", "Behavioral Therapy"]
    },
    {
      id: 3,
      name: "PawProtect Plus",
      logo: "💚",
      monthlyPrice: 48,
      yearlyPrice: 510,
      description: "Not sure which coverage is best? Don't worry - we'll lay out the coverage in simple terms so you know what you're buying.",
      features: ["Comprehensive Coverage", "No Age Limits", "Cancer Treatment", "Rehabilitation"]
    }
  ]

  return (
    <div className="results-page">
      <Header showNavigation={true} />
      <div className="results-container">
        <div className="results-hero">
          <h1 className="results-title sansita-bold">Get quotes from trusted carriers.</h1>
          <p className="results-subtitle nunito-sans">
            We found {mockResults.length} perfect insurance matches for your fur baby based on your preferences.
          </p>
          <button onClick={() => navigate('/')} className="btn-secondary">
            Start New Search
          </button>
        </div>

        <div className="insurance-grid">
          {mockResults.map((provider, index) => (
            <div key={provider.id} className={`insurance-card ${index === 1 ? 'featured' : ''}`}>
              <div className="card-header">
                <div className="provider-logo">{provider.logo}</div>
                <h3 className="provider-name sansita-bold">{provider.name}</h3>
              </div>
              
              <div className="pricing">
                <div className="price-main">
                  <span className="price nunito-sans-bold">${provider.monthlyPrice}/month</span>
                  <span className="price-alt nunito-sans">or ${provider.yearlyPrice}/12 months</span>
                </div>
              </div>

              <div className="description">
                <p className="nunito-sans">{provider.description}</p>
              </div>

              <div className="features">
                <ul>
                  {provider.features.map((feature, idx) => (
                    <li key={idx} className="nunito-sans">
                      <span className="checkmark">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="btn-primary full-width">
                Get Quote
              </button>
            </div>
          ))}
        </div>

        <div className="bottom-cta">
          <button className="btn-primary large">
            Fetch A Quote
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results