import { useLayoutEffect, useState, type ReactNode } from 'react';
import { THEME_STORAGE } from '../constants';
import type { Theme } from './types';
import { ThemeContext } from './ThemeContext';

type Props = {
  children: ReactNode;
};

// определяю пользовательскую тему
const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem(THEME_STORAGE) as Theme | null;

  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDark ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }: Props) => {
  //передаем в состояние
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useLayoutEffect(() => {
    document.body.classList.toggle('darkLayout', theme === 'dark');
  }, [theme]);

  useLayoutEffect(() => {
    //слушаем системную только если пользователь не выбирал тему
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const hadler = () => {
      const savedTheme = localStorage.getItem(THEME_STORAGE);

      if (!savedTheme) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', hadler);

    return () => {
      mediaQuery.removeEventListener('change', hadler);
    };
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
