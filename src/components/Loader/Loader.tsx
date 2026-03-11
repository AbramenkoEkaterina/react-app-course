import type React from 'react';
import styles from './Loader.module.css';

export const Loader: React.FC = () => {
  return (
    <div className={styles.backdrop}>
      <span className={styles.loader}></span>
    </div>
  );
};

export const SmallLoader: React.FC = () => {
  return <span className={styles.smallLoader}></span>;
};
