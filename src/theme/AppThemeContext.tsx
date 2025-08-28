import type { ThemeProviderStateType } from "@/lib/types";
import { createContext } from "react";

const defaulatValue: ThemeProviderStateType = {
  theme: "light",
  changeTheme: () => () => console.log("default context value"),
};

const AppThemeContext = createContext(defaulatValue);
export default AppThemeContext;
