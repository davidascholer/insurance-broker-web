import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'

interface InsuranceProvider {
  id: number
  name: string
  logo: string
  monthlyPrice: number
  yearlyPrice: number
  vetFeeLimit: string
  annualLimit: string
  excess: string
  excessType: string
  goodToKnow: string[]
  beAware: string[]
}

const Results = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name') || 'your pet'
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  const toggleExpanded = (cardId: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId)
    } else {
      newExpanded.add(cardId)
    }
    setExpandedCards(newExpanded)
  }

  const mockResults: InsuranceProvider[] = [
    {
      id: 1,
      name: "Healthy Pets",
      logo: "🧡",
      monthlyPrice: 7.49,
      yearlyPrice: 89.85,
      vetFeeLimit: "£1,000",
      annualLimit: "£1,000", 
      excess: "£125 + 15% contribution",
      excessType: "Per condition per policy year",
      goodToKnow: [
        "Comprehensive accident & illness cover",
        "Quick online claims process",
        "24/7 vet helpline included"
      ],
      beAware: [
        "Excess increases with pet age after 6 years",
        "Dental cover only for accidents not illness", 
        "Pre-existing conditions not covered"
      ]
    },
    {
      id: 2,
      name: "4 Paws Insurance",
      logo: "🐾", 
      monthlyPrice: 8.14,
      yearlyPrice: 97.63,
      vetFeeLimit: "£1,000",
      annualLimit: "Unlimited",
      excess: "£85 + 30% contribution", 
      excessType: "Per condition",
      goodToKnow: [
        "No excess increases as pet ages",
        "Dental cover for accidents & illness",
        "Lost & stolen cover included"
      ],
      beAware: [
        "Limit on MRI scans and cruciate claims",
        "Pre-existing conditions not covered",
        "No cover for pet sitting"
      ]
    },
    {
      id: 3,
      name: "PetCare Direct", 
      logo: "💙",
      monthlyPrice: 12.25,
      yearlyPrice: 147.00,
      vetFeeLimit: "£2,000",
      annualLimit: "£5,000",
      excess: "£99 flat rate",
      excessType: "Per condition per year", 
      goodToKnow: [
        "Higher coverage limits",
        "Fixed excess - no percentage fees",
        "Cover for alternative therapies"
      ],
      beAware: [
        "Higher monthly premium",
        "Waiting period for illness claims",
        "Some breed restrictions apply"
      ]
    }
  ]

  return (
    <div className="results-page">
      <Header showNavigation={true} />
      <div className="results-container">
        <div className="results-hero">
          <h1 className="results-title sansita-bold">Your insurance quotes for {name}</h1>
          <p className="results-subtitle nunito-sans">
            We found {mockResults.length} great insurance options for {name}. Compare coverage and find the perfect fit.
          </p>
          <button onClick={() => navigate('/')} className="btn-secondary">
            Start New Search
          </button>
        </div>

        <div className="insurance-list">
          {mockResults.map((provider) => {
            const isExpanded = expandedCards.has(provider.id)
            return (
              <div key={provider.id} className="insurance-result-card">
                <div className="card-main">
                  <div className="provider-info">
                    <div className="provider-logo">{provider.logo}</div>
                    <h3 className="provider-name sansita-bold">{provider.name}</h3>
                  </div>
                  
                  <div className="pricing-section">
                    <div className="price-display">
                      <span className="monthly-price sansita-bold">£{provider.monthlyPrice}</span>
                      <span className="price-period nunito-sans">or £{provider.yearlyPrice} annually</span>
                    </div>
                  </div>

                  <div className="coverage-details">
                    <div className="coverage-item">
                      <span className="coverage-label nunito-sans">Vet fee per condition limit</span>
                      <span className="coverage-value nunito-sans-bold green-text">{provider.vetFeeLimit}</span>
                    </div>
                    
                    <div className="coverage-item">
                      <span className="coverage-label nunito-sans">Vet fee annual policy limit</span>
                      <span className="coverage-value nunito-sans-bold green-text">{provider.annualLimit}</span>
                    </div>
                  </div>

                  <div className="excess-section">
                    <div className="excess-info">
                      <span className="excess-label nunito-sans">Excess</span>
                      <div className="excess-details">
                        <span className="excess-amount green-text nunito-sans-bold">{provider.excess}</span>
                        <span className="excess-type nunito-sans">{provider.excessType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-divider">
                  <button 
                    className={`expand-btn ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleExpanded(provider.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </button>
                </div>

                {isExpanded && (
                  <div className="card-footer">
                    <div className="pros-cons">
                      <div className="good-to-know">
                        <h4 className="nunito-sans-bold">Good to know:</h4>
                        <ul>
                          {provider.goodToKnow.map((item, idx) => (
                            <li key={idx} className="nunito-sans">
                              <span className="check-icon">✓</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="be-aware">
                        <h4 className="nunito-sans-bold">Be aware:</h4>
                        <ul>
                          {provider.beAware.map((item, idx) => (
                            <li key={idx} className="nunito-sans">
                              <span className="warning-icon">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Results