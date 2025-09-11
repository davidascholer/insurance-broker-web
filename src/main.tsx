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
    // Allow enhanced ecommerce features
    allow_enhanced_conversions: true,
    // Configure campaign tracking
    custom_map: {
      custom_parameter_1: 'utm_source',
      custom_parameter_2: 'utm_medium', 
      custom_parameter_3: 'utm_campaign',
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </StrictMode>,
)
