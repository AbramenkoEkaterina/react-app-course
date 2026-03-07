import styles from './SortSelect.module.css';

export type SortOption = '' | '_sort=level' | '_sort=-level' | '_sort=completed' | '_sort=-completed';

interface SortSelectProps {
  value: SortOption;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <select value={value} onChange={onChange} className={styles.select}>
      <option value="">sort by </option>
      <hr />
      <option value="_sort=level">Level ASC</option>
      <option value="_sort=-level">Level DESC</option>
      <option value="_sort=completed">completed ASC</option>
      <option value="_sort=-completed">completed ASC</option>
    </select>
  );
};
