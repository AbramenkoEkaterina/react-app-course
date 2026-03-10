import styles from './HomePage.module.css';
import { API_URL } from '../../constants';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { IQuestion } from '../../components/QuestionCard/types';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import { SearchInput } from '../../components/SearchInput';
import { SortSelect } from '../../components/SortSelect';
import type { SortOption } from '../../components/SortSelect/SortSelect';
import { Pagination } from '../../components/Pagination';
import type { IPaginatedResponse } from '../../types/api';

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const [questions, setQuestions] = useState<IPaginatedResponse<IQuestion> | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [sortSelectValue, setSortSelectValue] = useState<SortOption>('');
  const [page, setPage] = useState(1);

  //для скролла надо
  const controlsContainerRef = useRef<HTMLDivElement | null>(null);

  const [getQuestions, isLoading, error] = useFetch<IPaginatedResponse<IQuestion>, string>(async (url: string) => {
    const response = await fetch(`${API_URL}/${url}`);
    const data = await response.json();

    setQuestions(data);
    return data;
  });

  const normalizedSearch = searchValue.trim().toLowerCase();
  const isFirstRender = useRef(true);

  //предотвращает лишние пересчёты при каждом рендере
  const cards = useMemo(() => {
    if (questions?.data) {
      if (normalizedSearch) {
        return questions.data.filter((q) => q.question.toLowerCase().includes(normalizedSearch));
      } else {
        return questions.data;
      }
    }
    return [];
  }, [questions, normalizedSearch]);

  //пересчитывай pagination только когда изменится questions
  const pagination = useMemo(() => {
    const totalCardsCount = questions?.pages || 0;

    return Array(totalCardsCount)
      .fill(0)
      .map((_, i) => i + 1);
  }, [questions]);

  useEffect(() => {
    const query = `react?_page=${page}&_per_page=${DEFAULT_PER_PAGE}${sortSelectValue ? `&${sortSelectValue}` : ''}`;

    getQuestions(query);

    if (!isFirstRender.current) {
      controlsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    isFirstRender.current = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortSelectValue]);

  const onSearchValueHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortSelectValue(e.target.value as SortOption);
  };

  return (
    <>
      <div className={styles.controlsContainer} ref={controlsContainerRef}>
        <SearchInput value={searchValue} onChange={onSearchValueHadler} />

        <SortSelect value={sortSelectValue} onChange={onSortSelectChangeHandler} />
      </div>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList questions={cards} />
      {cards.length === 0 ? (
        <p className={styles.noCardsInfo}>No cards...</p>
      ) : (
        <Pagination pages={pagination} currentPage={page} onPageChange={setPage} />
      )}
    </>
  );
};
