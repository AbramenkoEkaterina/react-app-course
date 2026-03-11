import { useNavigate, useParams } from 'react-router-dom';
import styles from './QuestionPage.module.css';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { useEffect, useId, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { API_URL } from '../../constants';
import { Loader, SmallLoader } from '../../components/Loader';
import type { IQuestion } from '../../components/QuestionCard/types';

export const QuestionPage = () => {
  const checkboxId = useId();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [card, setCard] = useState<IQuestion | null>(null);

  const [fetchCard, isCardLoading, error] = useFetch<IQuestion>(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data: IQuestion = await response.json();

    setCard(data);
    return data;
  });

  const [updateCard, isCardUpdating] = useFetch<IQuestion, boolean>(async (isChecked) => {
    const response = await fetch(`${API_URL}/react/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: isChecked }),
    });
    const data: IQuestion = await response.json();

    setCard(data);
    return data;
  });

  useEffect(() => {
    if (id) {
      fetchCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onCheckboxChangeHadler = () => {
    if (!card) return;
    updateCard(!card.completed);
  };

  if (isCardLoading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!card) return null;

  const levelVariant = card.level === 1 ? 'primary' : card.level === 2 ? 'warning' : 'alert';
  const completedVariant = card.completed ? 'success' : 'primary';

  return (
    <div className={styles.container}>
      <div className={styles.cardLabels}>
        <Badge variant={levelVariant}>Level: {card.level}</Badge>
        <Badge variant={completedVariant}>{card.completed ? 'Completed' : 'Not Completed'}</Badge>
        {card?.editDate && <p className={styles.editDate}>Edited: {card.editDate}</p>}
      </div>

      <h5 className={styles.cardTitle}>{card.question}</h5>
      <p className={styles.cardDescription}>{card.description}</p>

      <div className={styles.cardAnswers}>
        <label> short answer: </label>
        <p className={styles.cardAnswer}>{card.answer}</p>
      </div>

      <ul className={styles.cardLinks}>
        Resources:
        {card.resources.map((link) => {
          return (
            <li key={link}>
              <a href={link.trim()} target="_blank" rel="noreferrer">
                {link.trim()}
              </a>
            </li>
          );
        })}
      </ul>

      <label htmlFor={checkboxId} className={styles.cardCheckbox}>
        <input
          type="checkbox"
          id={checkboxId}
          className={styles.checkbox}
          checked={card.completed}
          onChange={onCheckboxChangeHadler}
          disabled={isCardUpdating}
        />
        <span>mark question as completed</span>
        {isCardUpdating && <SmallLoader />}
      </label>

      <Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isCardUpdating}>
        Edit Question
      </Button>
      <Button onClick={() => navigate('/')} isDisabled={isCardUpdating}>
        Back
      </Button>
    </div>
  );
};
