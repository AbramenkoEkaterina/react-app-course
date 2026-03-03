import { QuestionCard } from '../../components/QuestionCard';
import styles from './HomePage.module.css';
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import type { IQuestion } from '../../components/QuestionCard/types';

export const HomePage = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const getQuestions = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/react`);
      const questions = await response.json();
      setQuestions(questions);
      console.log("questions", questions)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getQuestions();
  }, [])

  return (
    <>
      {questions.map((card, index) => (
        <QuestionCard card={card} key={index} />
      ))}

    </>
  );
};
