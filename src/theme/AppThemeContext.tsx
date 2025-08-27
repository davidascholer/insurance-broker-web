import type { ThemeProviderStateType } from "@/lib/types";
import { createContext } from "react";

const AppThemeContext = (initialState: ThemeProviderStateType) =>
  createContext<ThemeProviderStateType>(initialState);

export default AppThemeContext;
