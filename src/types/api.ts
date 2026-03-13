export type IPaginatedResponse<T> = {
  data: T[];
  items: number;
  pages: number;
  first: number;
  last: number;
  next: number | null;
  prev: number | null;
};

export type CreateQuestionDto = {
  question: string;
  answer: string;
  description: string;
  resources: string[];
  level: number;
  completed: boolean;
  editDate?: string;
};
