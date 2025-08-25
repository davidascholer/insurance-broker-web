import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ColorThemeType } from "@/lib/types";

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme: ColorThemeType;
  storageKey: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ColorThemeType>(defaultTheme);

  useEffect(() => {
    const initialTheme = localStorage.getItem(storageKey) as ColorThemeType;
    if (!initialTheme) {
      setTheme(initialTheme);
      localStorage.setItem(storageKey, defaultTheme);
    }
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    changeTheme: (theme: ColorThemeType) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  const ThemeContext = createContext(value);

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  );
}
