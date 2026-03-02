import { Button } from '../Button';
import styles from './Header.module.css';
import ReactLogo from '../../assets/react.svg'

export const Header = () => {
  return (
    <header className={styles.header}>
      <p>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={styles.headerButtons}>
        <Button isDisabled>Add</Button>
        <Button isActive>login</Button>
      </div>
    </header>
  );
};
