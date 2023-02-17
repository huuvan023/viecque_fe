export interface ResponseModel<T> {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  data: T;
  totalRecord?: number;
}
