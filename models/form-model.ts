export interface FormModel<T> {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  data: T;
}
