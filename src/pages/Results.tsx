import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/header/Header'

interface InsuranceProvider {
  id: number
  name: string
  logo: string
  monthlyPrice: string
  yearlyPrice: string
  annualDeductible: string
  annualLimit: string
  excess: string
  excessType: string
  goodToKnow: string[]
  beAware: string[]
  url: string
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
      name: "ASPCA Pet Health Insurance",
      logo: "./aspca.png",
      monthlyPrice: "$7.49",
      yearlyPrice: "$89.85",
      annualDeductible: "$500",
      annualLimit: "Unlimited", 
      excess: "80%",
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
      ],
      url: "https://www.aspcapetinsurance.com/"
    },
    {
      id: 2,
      name: "Fetch",
      logo: "./fetch.svg", 
      monthlyPrice: "$8.14",
      yearlyPrice: "$97.63",
      annualDeductible: "$500",
      annualLimit: "Unlimited",
      excess: "80%", 
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
      ],
      url: "https://www.fetchpet.com/"
    },
    {
      id: 3,
      name: "Embrace", 
      logo: "./embrace.svg",
      monthlyPrice: "$12.25",
      yearlyPrice: "$147.00",
      annualDeductible: "$250",
      annualLimit: "$20,000",
      excess: "85%",
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
      ],
      url: "https://www.embracepetinsurance.com/"
    }
  ]

  return (
    <div className="results-page">
      <Header showFetchButton={false} />
      <div className="results-container">
        <div className="results-hero">
          <h1 className="results-title sansita-bold">Your insurance quotes for {name}</h1>
          <p className="results-subtitle nunito-sans">
            We found {mockResults.length} great insurance options for {name}. Compare coverage and find the perfect fit.
          </p>
        </div>

        <div className="insurance-list">
          {mockResults.map((provider) => {
            const isExpanded = expandedCards.has(provider.id)
            return (
              <div key={provider.id} className="insurance-result-card">
                <div className="card-main">
                  <div className="card-header">
                    <div className="provider-info">
                      <div className="provider-logo">
                        <img src={provider.logo} alt={provider.name} className="provider-logo-img" />
                      </div>
                    </div>
                    
                    <div className="pricing-section">
                      <div className="price-display">
                        <span className="monthly-price sansita-bold">{provider.monthlyPrice}</span>
                        <span className="price-period nunito-sans">per month</span>
                        <span className="price-period nunito-sans">or {provider.yearlyPrice} annually</span>
                      </div>
                      <button 
                        className="cta-button nunito-sans-bold"
                        onClick={() => window.open(provider.url, '_blank')}
                      >
                        Let's Go
                      </button>
                    </div>
                  </div>
                  
                  <div className="coverage-grid">
                    <div className="coverage-item">
                      <span className="coverage-label nunito-sans">Annual deductible</span>
                      <span className="coverage-value nunito-sans-bold green-text">{provider.annualDeductible}</span>
                    </div>
                    
                    <div className="coverage-item">
                      <span className="coverage-label nunito-sans">Vet fee annual policy limit</span>
                      <span className="coverage-value nunito-sans-bold green-text">{provider.annualLimit}</span>
                    </div>

                    <div className="excess-item">
                      <span className="coverage-label nunito-sans">Excess </span>
                      <div className="excess-details">
                        <span className="excess-amount nunito-sans-bold">{provider.excess}</span>
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
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={() => navigate('/')} className="btn-secondary">
            Start New Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results