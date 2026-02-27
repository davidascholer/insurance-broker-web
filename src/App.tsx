import { useEffect } from "react";
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router";
import { trackUTM } from "./api/api";
// import { useContext } from "react";
// import AppThemeContext from "./theme/AppThemeContext";

function App() {
  // const {theme} = useContext(AppThemeContext);
  useEffect(() => {
    // Send initial pageview with UTM data
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source") || urlParams.get("utm");
    // const utmMedium = urlParams.get("utm_medium") || "none";
    // const utmCampaign = urlParams.get("utm_campaign") || "none";

    if (!utmSource) return;

    console.log("Tracking initial pageview with UTM data:", {
      utm_source: utmSource,
      // utm_medium: utmMedium,
      // utm_campaign: utmCampaign,
    });

    // Track UTM data in our backend
    trackUTM({
      utmOrigin: utmSource,
    });
  }, []);

  return (
    <div className="app" data-theme={"light"}>
      {/* <div className="app" data-theme={theme}> */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
