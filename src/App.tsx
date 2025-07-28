import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
