export type IPaginatedResponse<T> = {
  data: T[];
  items: number;
  pages: number;
  first: number;
  last: number;
  next: number | null;
  prev: number | null;
};
