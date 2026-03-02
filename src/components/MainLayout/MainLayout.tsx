import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { Header } from '../Header';

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.mainLayout}>
      <Header />
      <div className={styles.mainWrapper}>
        <main  className={styles.main}>
          <Outlet />
          </main>
        <footer  className={styles.footer}>
          React Question Cards Application | {currentYear} <br />
          by Ekaterina Abramenko
        </footer>
      </div>
    </div>
  );
};
