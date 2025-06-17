import { useEffect, useRef } from 'react'
import Header from '../components/Header'

declare global {
  interface Window {
    Landbot: {
      Container: new (config: { 
        configUrl: string
        container: string
      }) => void
    }
  }
}

const ChatBot = () => {
  const landbotRef = useRef<boolean>(false)

  useEffect(() => {
    if (landbotRef.current) return

    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs'
    script.setAttribute('SameSite', 'None; Secure')
    
    script.onload = () => {
      const myLandbot = new window.Landbot.Container({
        container: '#myLandbot',
        configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-3001326-VOIA6ZH49TU1ZHEO/index.json',
      })
    }

    document.head.appendChild(script)
    landbotRef.current = true

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="chatbot-page">
      <Header showNavigation={true} />
      
      <div className="hero-section">
        <div className="hero-background">
          <img src="/header.jpg" alt="Cat and Dog" className="hero-image" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title sansita-bold">
            Get the insurance that works best for you and for your fur baby today.
          </h1>
        </div>
      </div>

      <div className="landbot-wrapper">
        <div id="myLandbot" className="landbot-container"></div>
      </div>
    </div>
  )
}

export default ChatBot