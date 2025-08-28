import type { ColorThemeType, ThemeProviderStateType } from "@/lib/types";
import { useState } from "react";
import { PIPA_COLOR_THEME_KEY } from "@/lib/constants";
import AppThemeContext from "./AppThemeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
}

function AppThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ColorThemeType>("dark");

  const value: ThemeProviderStateType = {
    theme: currentTheme,
    changeTheme: () => {
      // Change the new theme to state
      let newTheme: ColorThemeType = "light";
      if (currentTheme === "light") newTheme = "system";
      if (currentTheme === "system") newTheme = "dark";
      if (currentTheme === "dark") newTheme = "light";
      localStorage.setItem(PIPA_COLOR_THEME_KEY, newTheme);
      setCurrentTheme(newTheme);

      // Set the new theme to the browser
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      if (newTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(newTheme);
      }
    },
  };

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

export default AppThemeProvider;
