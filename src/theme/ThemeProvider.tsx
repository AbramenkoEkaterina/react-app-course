import { useState, type ReactNode } from 'react';
import { THEME_STORAGE } from '../constants';
import type { Theme } from './types';
import { ThemeContext } from './ThemeContext';

type Props = {
  children: ReactNode;
};
export const ThemeProvider = ({ children }: Props) => {
  const savedTheme = localStorage.getItem(THEME_STORAGE) as Theme | null;
  const [theme, setTheme] = useState<Theme>(savedTheme || 'light');

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
