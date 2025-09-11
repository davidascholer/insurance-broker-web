import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App'
import AppThemeProvider from './theme/AppThemeProvider'
import ReactGA from "react-ga4";

ReactGA.initialize("G-QDQLNZ7VH8", {
  gtagOptions: {
    send_page_view: false, // We'll send pageviews manually with UTM data
    cookie_flags: 'SameSite=None;Secure',
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </StrictMode>,
)
