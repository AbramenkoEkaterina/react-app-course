import styles from './HomePage.module.css';
import { API_URL } from '../../constants';
import { useEffect, useMemo, useState } from 'react';
import type { IQuestion } from '../../components/QuestionCard/types';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import { SearchInput } from '../../components/SearchInput';
import { SortSelect } from '../../components/SortSelect';
import type { SortOption } from '../../components/SortSelect/SortSelect';

export const HomePage = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortSelectValue, setSortSelectValue] = useState<SortOption>('');

  const [getQuestions, isLoading, error] = useFetch<IQuestion[], string>(async (url: string) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  const normalizedSearch = searchValue.trim().toLowerCase();

  const cards = useMemo(() => {
    return questions.filter((q) => q.question.toLowerCase().includes(normalizedSearch));
  }, [questions, normalizedSearch]);

  useEffect(() => {
    getQuestions(`react?${sortSelectValue}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortSelectValue]);

  const onSearchValueHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortSelectValue(e.target.value as SortOption);
  };

  return (
    <>
      <div className={styles.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchValueHadler} />

        <SortSelect value={sortSelectValue} onChange={onSortSelectChangeHandler} />
      </div>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {cards.length === 0 && <p className={styles.noCardsInfo}>No cards...</p>}
      <QuestionCardList questions={cards} />
    </>
  );
};
