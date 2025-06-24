import { useEffect, useRef } from 'react'
import Header from '../components/Header'
import { chatbotImageData } from '../data/imageData'

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
      new window.Landbot.Container({
        container: '#myLandbot',
        configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-3001326-VOIA6ZH49TU1ZHEO/index.json',
      })
      
      // Inject CSS into iframe after a delay to ensure it's loaded
      setTimeout(() => {
        const iframe = document.querySelector('#myLandbot iframe') as HTMLIFrameElement
        if (iframe && iframe.contentDocument) {
          const style = iframe.contentDocument.createElement('style')
          style.textContent = `
            .Header__Title {
              font-family: "Sansita", cursive !important;
              font-weight: 700 !important;
              font-size: 3.5rem !important;
              line-height: 1.2 !important;
              color: white !important;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3) !important;
            }
            .Branding__Container {
              display: none !important;
            }
            @media (max-width: 768px) {
              .Header__Title {
                font-size: 2.5rem !important;
              }
            }
          `
          iframe.contentDocument.head.appendChild(style)
          
          // Load and insert text.png as base64 into msg-grid-container
          setTimeout(async () => {
            const msgGridContainer = iframe.contentDocument?.querySelector('.msg-grid-container')
            if (msgGridContainer) {
              try {
                // Fetch the image from the local server
                const dataUrl = chatbotImageData.textPng
                
                // Create and insert the image
                const img = iframe.contentDocument.createElement('img')
                img.src = dataUrl
                img.style.cssText = 'width: 100%; height: auto; display: block; margin: 10px 0;'
                
                if (msgGridContainer.firstChild) {
                  msgGridContainer.insertBefore(img, msgGridContainer.firstChild)
                } else {
                  msgGridContainer.appendChild(img)
                }
              } catch (error) {
                console.error('Failed to load text.png:', error)
              }
            }
          }, 500)
        }
      }, 2000)
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
        
        <div className="landbot-wrapper">
          <div id="myLandbot" className="landbot-container"></div>
        </div>
      </div>
    </div>
  )
}

export default ChatBot