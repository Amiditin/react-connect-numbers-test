export interface IConnectNumbersTest {
  number: number;
  completed: boolean;
  time: number | null;
  itemsOptions: {
    withLetters: boolean;
    numberItems: number;
  };
}
