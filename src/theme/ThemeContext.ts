import { createContext } from 'react';
import type { Theme } from './types';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};
export const ThemeContext = createContext<ThemeContextType | null>(null);
