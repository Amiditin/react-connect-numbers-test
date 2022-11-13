import { IConnectNumbersTest } from './types';
import {
  matrixItemsForTest1,
  matrixItemsForTest2,
  matrixItemsForTest3,
  matrixItemsForTest4,
} from '../matrixItemsForTests';

export const connectNumbersTests: IConnectNumbersTest[] = [
  {
    number: 1,
    completed: false,
    time: null,
    items: matrixItemsForTest1,
  },
  {
    number: 2,
    completed: false,
    time: null,
    items: matrixItemsForTest2,
  },
  {
    number: 3,
    completed: false,
    time: null,
    items: matrixItemsForTest3,
  },
  {
    number: 4,
    completed: false,
    time: null,
    items: matrixItemsForTest4,
  },
];
