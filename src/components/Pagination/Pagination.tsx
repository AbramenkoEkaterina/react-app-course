import styles from './Pagination.module.css';
import { Button } from '../Button';

interface PaginationProps {
  pages: number[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ pages, currentPage, onPageChange }: PaginationProps) => {
  return (
    <div className={styles.paginationContainer}>
      {pages.map((page) => {
        return (
          <Button key={page} onClick={() => onPageChange(page)} isActive={currentPage === page} isDisabled={currentPage === page}>
            {page}
          </Button>
        );
      })}
    </div>
  );
};
