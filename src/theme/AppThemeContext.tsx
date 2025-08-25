import type { ColorThemeType } from "@/lib/types";
import { createContext } from "react";

export type ThemeProviderState = {
  theme: ColorThemeType;
  changeTheme: (theme: ColorThemeType) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  changeTheme: () => console.log("changeTheme not implemented"),
};

const AppThemeProviderContext = createContext<ThemeProviderState>(initialState);
export default AppThemeProviderContext;
