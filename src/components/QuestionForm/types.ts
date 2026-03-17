//тип состояния формы
export type AddQuestionFormState = {
  question?: string;
  answer?: string;
  description?: string;
  resources?: string;
  level?: string;
  clearForm?: boolean;
  id?: string;
};
