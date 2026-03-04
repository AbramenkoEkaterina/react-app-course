//import styles from './HomePage.module.css';
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import type { IQuestion } from '../../components/QuestionCard/types';
import { QuestionCardList } from '../../components/QuestionCardList';
import { Loader } from '../../components/Loader';
import { useFetch } from '../../hooks/useFetch';

export const HomePage = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const [getQuestions, isLoading, error] = useFetch<IQuestion[], string>(async (url: string) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();

    setQuestions(questions);
    return questions;
  });

  useEffect(() => {
    getQuestions('react');
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <QuestionCardList questions={questions} />
    </>
  );
};
