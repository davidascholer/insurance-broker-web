import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    Landbot: {
      Fullpage: new (config: { configUrl: string }) => void
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
      new window.Landbot.Fullpage({
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
    <div className="landbot-container">
      <div id="landbot-container"></div>
    </div>
  )
}

export default ChatBot