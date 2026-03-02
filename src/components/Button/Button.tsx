import type { ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode; //текст или элементы внутри кнопки
  isActive?: boolean; //активный стиль кнопки
  onClick?: () => void;
  className?: string;
  isDisabled?: boolean;
}

export const Button = ({ children, isActive = false, onClick, className = '', isDisabled = false }: ButtonProps) => {
  return (
    <button
      className={`
        ${styles.btn} 
        ${isActive ? styles.active : ''} 
        ${className}
        `.trim()}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
