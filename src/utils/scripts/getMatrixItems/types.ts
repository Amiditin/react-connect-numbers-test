import { IMatrix } from '../../constants/types';

export type GetIntervalExtremum = (
  coord: number,
  maxDistance: number,
  type: 'min' | 'max',
) => number;

export type GetMatrixItems = (
  withLetters?: boolean,
  numberItems?: number,
  matrixOptions?: IMatrix,
) => IMatrixItem[];

export interface IMatrixItem {
  active: boolean;
  coordX: number;
  coordY: number;
  number: number;
  text: string;
}

export type Interval = {
  width: { min: number; max: number };
  height: { min: number; max: number };
};
