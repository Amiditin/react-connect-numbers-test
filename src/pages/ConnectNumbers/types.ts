export type TestStatus = 'pending' | 'started' | 'finished' | 'failed';

export interface IConnectNumbersForm {
  age: number;
  email: string;
  name: string;
  phone?: number;
}

export interface IPostData extends IConnectNumbersForm {
  results: { number: number; time: number | null }[];
}
