import { IMatrixItem } from '../matrixItemsForTests/types';

export interface IConnectNumbersTest {
  number: number;
  completed: boolean;
  time: number | null;
  items: IMatrixItem[];
}
