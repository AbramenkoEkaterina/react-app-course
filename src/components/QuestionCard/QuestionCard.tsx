import { Button } from '../Button';
import styles from './QuestionCard.module.css';

export const QuestionCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardLabels}>
        <div>Level: 1</div>
        <div>Not Completed</div>
      </div>

      <h5 className={styles.cardTitle}>Что такое JSX?</h5>

      <div className={styles.cardAnswers}>
        <label> short answer: </label>
        <p className={styles.cardAnswer}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita, quod.</p>
      </div>
      <Button onClick={() => {}}>View</Button>
    </div>
  );
};
