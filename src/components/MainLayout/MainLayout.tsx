import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { Header } from '../Header';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import { Loader } from '../Loader';

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className={styles.mainLayout}>
        <Header />
        <div className={styles.mainWrapper}>
          <main className={styles.main}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </main>
          <footer className={styles.footer}>
            React Question Cards Application | {currentYear} <br />
            by Ekaterina Abramenko
          </footer>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
