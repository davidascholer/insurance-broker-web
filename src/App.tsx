import { useEffect } from "react";
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router";
import { trackUTM } from "./api/api";
import { IS_PROD } from "./lib/constants";
// import { useContext } from "react";
// import AppThemeContext from "./theme/AppThemeContext";

function App() {
  // const {theme} = useContext(AppThemeContext);
  useEffect(() => {
    if (!IS_PROD) {
      console.log("Not in production, skipping UTM tracking.");
      return;
    }
    // Send initial pageview with UTM data
    const urlParams = new URLSearchParams(window.location.search);
    const utmOrigin = urlParams.get("utm_source") || urlParams.get("utm");
    // const utmMedium = urlParams.get("utm_medium") || "none";
    // const utmCampaign = urlParams.get("utm_campaign") || "none";

    if (!utmOrigin) return;

    console.log("Tracking initial pageview with UTM data:", {
      type: "source",
      origin: utmOrigin,
    });

    // Track UTM data in our backend
    trackUTM({
      type: "source",
      origin: utmOrigin,
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
