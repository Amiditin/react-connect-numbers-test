import { IConnectNumbersTest } from './types';

export const connectNumbersTests: IConnectNumbersTest[] = [
  {
    number: 1,
    completed: false,
    time: null,
    itemsOptions: {
      withLetters: false,
      numberItems: 10,
    },
  },
  {
    number: 2,
    completed: false,
    time: null,
    itemsOptions: {
      withLetters: false,
      numberItems: 24,
    },
  },
  {
    number: 3,
    completed: false,
    time: null,
    itemsOptions: {
      withLetters: true,
      numberItems: 10,
    },
  },
  {
    number: 4,
    completed: false,
    time: null,
    itemsOptions: {
      withLetters: true,
      numberItems: 24,
    },
  },
];
