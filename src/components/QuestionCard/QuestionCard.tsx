import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import styles from './QuestionCard.module.css';
import type { IQuestion } from './types';
import { Badge } from '../Badge';

interface QuestionCardProps {
  card: IQuestion;
}

export const QuestionCard = ({ card }: QuestionCardProps) => {
  const navigate = useNavigate();

  const levelVariant = card.level === 1 ? 'primary' : card.level === 2 ? 'warning' : 'alert';
  const completedVariant = card.completed ? 'success' : 'primary';

  return (
    <div className={styles.card}>
      <div className={styles.cardLabels}>
        <Badge variant={levelVariant}>Level: {card.level}</Badge>
        <Badge variant={completedVariant}>{card.completed ? 'Completed' : 'Not Completed'}</Badge>
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
