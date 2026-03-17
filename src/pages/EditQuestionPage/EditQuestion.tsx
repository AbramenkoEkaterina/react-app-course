import { useActionState } from 'react';
import styles from './EditQuestionPage.module.css';
import { QuestionForm } from '../../components/QuestionForm';
import type { AddQuestionFormState } from '../../components/QuestionForm/types';
import { delayFn } from '../../helpers/delayFn';
import { API_URL } from '../../constants';
import { toast } from 'react-toastify';
import { dateFormat } from '../../helpers/dateFormat';

type EditQuestionProps = {
  id?: string;
  initialState?: AddQuestionFormState;
};

const editCardAction = async (prevState: AddQuestionFormState, formData: FormData): Promise<AddQuestionFormState> => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData) as Record<string, string>;

    const resources = newQuestion.resources?.trim() ?? '';
    const isClearForm = formData.get('clearForm') !== null;
    const questionId = newQuestion.questionId || newQuestion.id;

    const response = await fetch(`${API_URL}/react/${questionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(',').map((r) => r.trim()) : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: dateFormat(new Date()),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Request failed: ${response.status}`);
    }
    await response.json();
    toast.success('The question is edited successfully!');

    if (isClearForm) {
      return { clearForm: true };
    }

    return {
      question: newQuestion.question,
      answer: newQuestion.answer,
      description: newQuestion.description,
      resources: newQuestion.resources,
      level: newQuestion.level,
      clearForm: isClearForm,
    };
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }

    return prevState;
  }
};

export const EditQuestion = ({ id, initialState = {} }: EditQuestionProps) => {
  const [formState, formAction, isPending] = useActionState<AddQuestionFormState, FormData>(editCardAction, {
    ...initialState,
    clearForm: false,
  });
  return (
    <>
      <h1 className={styles.formTitle}>Edit question</h1>
      <div className={styles.formContainer}>
        <QuestionForm formAction={formAction} state={{ ...formState, id }} isPending={isPending} submitBtnText="Edit Question" />
      </div>
    </>
  );
};
