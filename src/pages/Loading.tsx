import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Loading = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/results')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner"></div>
        <h2>Finding your perfect pet matches...</h2>
        <p>We're analyzing your preferences and searching our database</p>
      </div>
    </div>
  )
}

export default Loading