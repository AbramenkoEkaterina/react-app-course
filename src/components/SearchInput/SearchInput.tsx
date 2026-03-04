import { useId } from 'react';
import styles from './SearchInput.module.css';
import { SearchIcon } from '../icons';

interface SearchInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const inputId = useId();
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={inputId}>
        <SearchIcon className={styles.searchIcon}/>
      </label>
      <input type="text" id={inputId} className={styles.input} placeholder="search..." value={value} onChange={onChange} />
    </div>
  );
};
