import type { ChangeEvent } from 'react';
import { THEME_STORAGE } from '../../constants';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggler.module.css';

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const updateTheme = isChecked ? 'light' : 'dark';

    setTheme(updateTheme);
    localStorage.setItem(THEME_STORAGE, updateTheme);
  };

  return (
    <div className={styles.toggle}>
      <input type="checkbox" onChange={onChangeHandler} checked={theme === 'light'} />
      <label></label>
    </div>
  );
};
