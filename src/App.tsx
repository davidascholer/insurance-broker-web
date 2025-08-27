import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router";
// import AppThemeProvider from "./theme/AppThemeProvider";
// import { PIPA_COLOR_THEME_KEY } from "./lib/constants";

function App() {
  return (
    <div className="app"  data-theme="dark">
      {/* <AppThemeProvider defaultTheme="light"> */}
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      {/* </AppThemeProvider> */}
    </div>
  );
}

export default App;
