import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router";
// import { useContext } from "react";
// import AppThemeContext from "./theme/AppThemeContext";

function App() {
  // const {theme} = useContext(AppThemeContext);

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
