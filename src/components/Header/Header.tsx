import { Button } from '../Button';
import styles from './Header.module.css';
import ReactLogo from '../../assets/react.svg';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <p onClick={() => navigate('/')}>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={styles.headerButtons}>
        <Button onClick={() => navigate('/addquestion')}>Add</Button>
        <Button>login</Button>
      </div>
    </header>
  );
};
