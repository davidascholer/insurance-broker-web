import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const Loading = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/results')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="loading-page">
      <Header />
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-header">
            <h1 className="loading-title sansita-bold">Finding your perfect pet matches...</h1>
            <p className="loading-subtitle nunito-sans">We're analyzing your preferences and searching our database of trusted providers</p>
          </div>
          
          <div className="loading-animation">
            <div className="paw-prints">
              <div className="paw-print paw-1">🐾</div>
              <div className="paw-print paw-2">🐾</div>
              <div className="paw-print paw-3">🐾</div>
            </div>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>

          <div className="loading-message">
            <p className="nunito-sans-medium">Connecting you with the best matches...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading