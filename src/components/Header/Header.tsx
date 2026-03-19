import { Button } from '../Button';
import styles from './Header.module.css';
import ReactLogo from '../../assets/react.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AUTH_STORAGE } from '../../constants';
import { ThemeToggler } from '../../features/ThemeToggler';

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useAuth();

  const LoginHandler = () => {
    localStorage.setItem(AUTH_STORAGE, JSON.stringify(!isAuth));
    setIsAuth(!isAuth);
  };

  return (
    <header className={styles.header}>
      <p onClick={() => navigate('/')}>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={styles.headerButtons}>
        <ThemeToggler />
        {isAuth && <Button onClick={() => navigate('/addquestion')}>Add</Button>}
        <Button onClick={LoginHandler} isActive={!isAuth}>
          {isAuth ? 'Logout' : 'Login'}
        </Button>
      </div>
    </header>
  );
};
