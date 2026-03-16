import { useActionState } from 'react';
import styles from './AddQuestionPage.module.css';
import { delayFn } from '../../helpers/delayFn';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';
import { Loader } from '../../components/Loader';
import { QuestionForm } from '../../components/QuestionForm';
import type { AddQuestionFormState } from '../../components/QuestionForm/types';

const createCardAction = async (prevState: AddQuestionFormState, formData: FormData): Promise<AddQuestionFormState> => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData) as Record<string, string>;
    const resources = newQuestion.resources?.trim() ?? '';
    const isClearForm = formData.get('clearForm') !== null;

    const response = await fetch(`${API_URL}/react`, {
      method: 'POST',
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
        editDate: undefined,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Request failed: ${response.status}`);
    }
    await response.json();
    toast.success('New question is successfully created!');

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

const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState<AddQuestionFormState, FormData>(createCardAction, {
    clearForm: true,
  });
  return (
    <>
      {isPending && <Loader />}
      <h1 className={styles.formTitle}>Add new question</h1>
      <div className={styles.formContainer}>
        <QuestionForm formAction={formAction} state={formState} isPending={isPending} submitBtnText="Add Question" />
      </div>
    </>
  );
};

export default AddQuestionPage;
