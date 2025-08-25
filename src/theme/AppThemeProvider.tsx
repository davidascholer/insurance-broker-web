import { ThemeProvider } from "./ThemeProvider";
import type { ColorThemeType } from "@/lib/types";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme: ColorThemeType;
  storageKey: string;
}

function AppThemeProvider({
  children,
  defaultTheme,
  storageKey,
}: ThemeProviderProps) {

  
  return (
    <ThemeProvider defaultTheme={defaultTheme} storageKey={storageKey}>
      {children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;
