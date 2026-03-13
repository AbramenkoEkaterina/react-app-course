import { useActionState } from 'react';
import { Button } from '../../components/Button';
import styles from './AddQuestionPage.module.css';
import { delayFn } from '../../helpers/delayFn';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';

//тип состояния формы
export type AddQuestionFormState = {
  question?: string;
  answer?: string;
  description?: string;
  resources?: string;
  level?: string;
  clearForm?: boolean;
};

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

export const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState<AddQuestionFormState, FormData>(createCardAction, {
    clearForm: true,
  });
  return (
    <>
      <h1 className={styles.formTitle}>Add new question</h1>
      <div className={styles.formContainer}>
        <form action={formAction} className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="questionField">Question: </label>
            <textarea
              defaultValue={formState?.question ?? ''}
              name="question"
              id="questionField"
              cols={30}
              rows={2}
              required
              placeholder="please enter a question"
            ></textarea>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="answerField">Short answer: </label>
            <textarea
              defaultValue={formState?.answer ?? ''}
              name="answer"
              id="answerField"
              cols={30}
              rows={2}
              required
              placeholder="please enter a short answer"
            ></textarea>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="descriptionField">Description: </label>
            <textarea
              defaultValue={formState?.description ?? ''}
              name="description"
              id="descriptionField"
              cols={30}
              rows={5}
              required
              placeholder="please enter a full description"
            ></textarea>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="resourcesField">Resources: </label>
            <textarea
              defaultValue={formState?.resources ?? ''}
              name="resources"
              id="resourcesField"
              cols={30}
              rows={5}
              required
              placeholder="please enter resources separeted by commas"
            ></textarea>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="levelField">Level: </label>
            <select name="level" id="levelField" defaultValue={formState?.level ?? ''}>
              <option disabled>Question level</option>
              <hr />
              <option value="1">1 - easiest</option>
              <option value="2">2 - medium</option>
              <option value="3">3 - hardest</option>
            </select>
          </div>

          <label htmlFor="clearFormField" className={styles.clearFormControl}>
            <input
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              defaultChecked={formState?.clearForm}
              className={styles.checkbox}
            />
            <span>clear form after submitting?</span>
          </label>

          <Button isDisabled={isPending}>Add question</Button>
        </form>
      </div>
    </>
  );
};
