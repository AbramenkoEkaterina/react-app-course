import { Button } from '../../components/Button';
import styles from './AddQuestionPage.module.css';

export const AddQuestionPage = () => {
  return (
    <>
      <h1 className={styles.formTitle}>Add new question</h1>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="questionField">Question: </label>
            <textarea
              defaultValue={'defaultValue'}
              name="question"
              id="uestionField"
              cols={30}
              rows={2}
              required
              placeholder="please enter a question"
            ></textarea>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="answerField">Short answer: </label>
            <textarea
              defaultValue={'defaultValue'}
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
              defaultValue={'defaultValue'}
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
              defaultValue={'defaultValue'}
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
            <select name="level" id="levelField" defaultValue={'defaultValue'}>
              <option disabled>Question level</option>
              <hr />
              <option value="1">1 - easiest</option>
              <option value="2">2 - medium</option>
              <option value="3">3 - hardest</option>
            </select>
          </div>

          <label htmlFor="clearFormField" className={styles.clearFormControl}>
            <input type="checkbox" name="clearForm" id="clearFormField" defaultValue="true" className={styles.checkbox} />
            <span>clear form after submitting?</span>
          </label>

          <Button>Add question</Button>
        </form>
      </div>
    </>
  );
};
