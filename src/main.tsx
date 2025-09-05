import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App'
import AppThemeProvider from './theme/AppThemeProvider'
import ReactGA from "react-ga4";

ReactGA.initialize("G-QDQLNZ7VH8");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </StrictMode>,
)
