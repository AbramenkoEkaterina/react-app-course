import { useParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { API_URL } from '../../constants';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import type { Question } from '../../types/api';
import { EditQuestion } from './EditQuestion';

const EditQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);

  const [fetchQuestion, isQuestionLoading] = useFetch<Question>(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);

    return response.json() as Promise<Question>;
  });

  useEffect(() => {
    const load = async () => {
      const data = await fetchQuestion();
      setQuestion(data ?? null);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isQuestionLoading) {
    return <Loader />;
  }
  return (
    <>
      {question && (
        <EditQuestion
          id={question.id}
          initialState={{
            question: question.question,
            answer: question.answer,
            description: question.description,
            resources: question.resources.join(', '),
            level: String(question.level),
            clearForm: false,
          }}
        />
      )}
    </>
  );
};

export default EditQuestionPage;
