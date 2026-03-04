import { memo } from 'react';
import { QuestionCard } from '../QuestionCard/QuestionCard';
import type { IQuestion } from '../QuestionCard/types';
import styles from './QuestionCardList.module.css';

interface QuestionCardListProps {
  questions: IQuestion[];
}

export const QuestionCardList = memo(({ questions }: QuestionCardListProps) => {
  return (
    <div className={styles.cardList}>
      {questions.map((card, index) => (
        <QuestionCard card={card} key={index} />
      ))}
    </div>
  );
});
