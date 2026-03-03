import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import styles from './QuestionCard.module.css';
import type { IQuestion } from './types';

export const mockQuestions: IQuestion[] = [
  {
    id: "1",
    question: "Что такое React?",
    answer: "React — это библиотека для создания пользовательских интерфейсов.",
    description: "React — это JavaScript-библиотека...",
    resources: ["https://react.dev"],
    level: 1,
    completed: true,
    editDate: "03.02.2025, 19:49",
  },
  {
    id: "2",
    question: "Что такое JSX?",
    answer: "JSX — это синтаксическое расширение JavaScript для React.",
    description: "JSX позволяет писать HTML-подобный код...",
    resources: ["https://react.dev/learn/writing-markup-with-jsx"],
    level: 2,
    completed: false,
    editDate: "03.02.2025, 20:25",
  },
  {
    id: "3",
    question: "Какой основной принцип работы React?",
    answer: "React использует Virtual DOM для оптимизации рендеринга.",
    description: "React поддерживает концепцию Virtual DOM...",
    resources: ["https://react.dev/learn/render-and-commit"],
    level: 2,
    completed: false,
  },
  {
    id: "4",
    question: "Как создать компонент в React?",
    answer: "Компонент можно создать как функцию или класс.",
    description: "Функциональные компоненты — это функции...",
    resources: ["https://react.dev/learn/your-first-component"],
    level: 1,
    completed: false,
  },
];

interface QuestionCardProps {
  card: IQuestion;
}

export const QuestionCard = ({card}: QuestionCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.cardLabels}>
        <div>Level: {card.level}</div>
        <div>{card.completed ? "Completed" : "Not Completed"}</div>
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
