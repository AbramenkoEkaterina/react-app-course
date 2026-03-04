import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import styles from './QuestionCard.module.css';
import type { IQuestion } from './types';

interface QuestionCardProps {
  card: IQuestion;
}

export const QuestionCard = ({ card }: QuestionCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.cardLabels}>
        <div>Level: {card.level}</div>
        <div>{card.completed ? 'Completed' : 'Not Completed'}</div>
      </div>

      <h5 className={styles.cardTitle}>{card.question}</h5>

      <div className={styles.cardAnswers}>
        <label> short answer: </label>
        <p className={styles.cardAnswer}>{card.answer}</p>
      </div>
      <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>
    </div>
  );
};
