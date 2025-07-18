import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from '../components/Header'

const Loading = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name') || 'your pet'

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/results?name=${encodeURIComponent(name)}`)
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate, name])

  return (
    <div className="loading-page">
      <Header showFetchButton={false} />
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-header">
            <h1 className="loading-title sansita-bold">Finding insurance for {name}...</h1>
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