import styles from './SortSelect.module.css';

export type SortOption = '' | '_sort=level' | '_sort=-level' | '_sort=completed' | '_sort=-completed';

interface SortSelectProps {
  value: SortOption;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <select value={value} onChange={onChange} className={styles.select}>
      <option value="">Без сортировки</option>
      <optgroup label="По уровню">
        <option value="_sort=level">Уровень ↑ (ASC)</option>
        <option value="_sort=-level">Уровень ↓ (DESC)</option>
      </optgroup>
      <optgroup label="По статусу выполнения">
        <option value="_sort=completed">Выполнено ↑ (ASC)</option>
        <option value="_sort=-completed">Выполнено ↓ (DESC)</option>
      </optgroup>
    </select>
  );
};
