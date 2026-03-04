import styles from './HomePage.module.css';
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import type { IQuestion } from '../../components/QuestionCard/types';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';
import { SearchInput } from '../../components/SearchInput';

export const HomePage = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const [getQuestions, isLoading, error] = useFetch<IQuestion[], string>(async (url: string) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  useEffect(() => {
    getQuestions('react');
  }, []);

  const onSearchValueHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={styles.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchValueHadler} />
      </div>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList questions={questions} />
    </>
  );
};
