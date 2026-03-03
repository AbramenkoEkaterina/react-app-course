import { QuestionCard } from '../../components/QuestionCard';
import styles from './HomePage.module.css';
import { mockQuestions } from '../../components/QuestionCard/QuestionCard';

export const HomePage = () => {
  return (
    <>
      {mockQuestions.map((card, index) => (
        <QuestionCard card={card} key={index} />
      ))}
    </>
  );
};
