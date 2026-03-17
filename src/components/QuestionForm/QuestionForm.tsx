import { Button } from '../Button';
import styles from './QuestionForm.module.css';
import type { AddQuestionFormState } from './types';

type QuestionFormProps = {
  formAction: (formData: FormData) => void;
  state?: AddQuestionFormState;
  isPending: boolean;
  submitBtnText: string;
};

export const QuestionForm = ({ formAction, state, isPending, submitBtnText }: QuestionFormProps) => {
  return (
    <form action={formAction} className={styles.form}>
      <input type="text" hidden name="questionId" defaultValue={state?.id} />
      <div className={styles.formControl}>
        <label htmlFor="questionField">Question: </label>
        <textarea
          defaultValue={state?.question ?? ''}
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
          defaultValue={state?.answer ?? ''}
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
          defaultValue={state?.description ?? ''}
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
          defaultValue={state?.resources ?? ''}
          name="resources"
          id="resourcesField"
          cols={30}
          rows={5}
          placeholder="please enter resources separeted by commas"
        ></textarea>
      </div>
      <div className={styles.formControl}>
        <label htmlFor="levelField">Level: </label>
        <select name="level" id="levelField" defaultValue={state?.level ?? ''}>
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
          defaultChecked={state?.clearForm}
          className={styles.checkbox}
        />
        <span>clear form after submitting?</span>
      </label>

      <Button isDisabled={isPending}>{submitBtnText}</Button>
    </form>
  );
};
