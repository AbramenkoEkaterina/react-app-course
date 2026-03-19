import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ForbiddenPage.module.css';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

type LocationState = {
  from?: string;
};

export const ForbiddenPage = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const fromPage = state?.from || '/';

  useEffect(() => {
    if (isAuth) {
      navigate(fromPage, { replace: true });
    }
  }, [isAuth, navigate, fromPage]);

  return <h2 className={styles.title}>Page is Forbidden!</h2>;
};
