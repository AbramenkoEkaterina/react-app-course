import styles from './PageSizeSelect.module.css';

interface PageSizeSelectProps {
  value: number;
  onChange: (value: number) => void;
}

export const PageSizeSelect = ({ value, onChange }: PageSizeSelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };
  return (
    <select value={value} onChange={handleChange} className={styles.select}>
      <option disabled>count </option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  );
};
