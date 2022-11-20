import React from 'react';
import styles from './Test.module.scss';
import clsx from 'clsx';

import { TestStatus } from '../types';
import { IMatrix, IConnectNumbersTest } from '../../../utils/constants/types';
import { IMatrixItem } from '../../../utils/scripts/types';

import { matrixDefault } from '../../../utils/constants';
import { getMatrixItems } from '../../../utils/scripts';

interface TestProps {
  matrixWidth: number;
  setTests: React.Dispatch<React.SetStateAction<IConnectNumbersTest[]>>;
  setTestStatus: React.Dispatch<React.SetStateAction<TestStatus>>;
  test: IConnectNumbersTest;
  testStatus: TestStatus;
}

export const Test: React.FC<TestProps> = ({
  matrixWidth,
  setTests,
  setTestStatus,
  test,
  testStatus,
}) => {
  const [items, setItems] = React.useState<IMatrixItem[]>([]);

  const matrix: IMatrix = React.useMemo((): IMatrix => {
    const initMatrix = {
      width: matrixWidth,
      height: Math.round((matrixDefault.height * matrixWidth) / matrixDefault.width),
      circleRadius: Math.round((matrixDefault.circleRadius * matrixWidth) / matrixDefault.width),
    };

    const initMatrixItems = getMatrixItems(
      test.itemsOptions.withLetters,
      test.itemsOptions.numberItems,
    ).map((item) => ({
      coordX:
        Math.round((item.coordX * initMatrix.width) / matrixDefault.width) -
        initMatrix.circleRadius,
      coordY:
        Math.round((item.coordY * initMatrix.height) / matrixDefault.height) -
        initMatrix.circleRadius,
      active: item.active,
      number: item.number,
      text: item.text,
    }));

    setItems(initMatrixItems);

    return initMatrix;
  }, [matrixWidth, test]);

  const getItemByNumber = (number: number): IMatrixItem => {
    return items.find((item) => item.number === number) || items[0];
  };

  const handleClickMatrixItem = (number: number) => {
    if (!getItemByNumber(number - 1).active) return;

    const newItems = items.map((item) =>
      item.number === number ? { ...item, active: true } : item,
    );

    setItems(newItems);

    if (newItems[items.length - 1].active) {
      setTestStatus('finished');
    }
  };

  return (
    <svg
      className={clsx(styles.test)}
      width={matrix.width}
      height={matrix.height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      {items.map((item) => (
        <g key={item.number} style={{ display: testStatus === 'started' ? '' : 'none' }}>
          {item.number !== items[items.length - 1].number && (
            <line
              className={clsx(
                styles.line,
                getItemByNumber(item.number + 1).active && styles.lineActive,
              )}
              x1={item.coordX + matrix.circleRadius}
              y1={item.coordY + matrix.circleRadius}
              x2={getItemByNumber(item.number + 1).coordX + matrix.circleRadius}
              y2={getItemByNumber(item.number + 1).coordY + matrix.circleRadius}
            />
          )}
          <g
            className={clsx(styles.item, item.active && styles.itemActive)}
            transform={`matrix(1,0,0,1,${item.coordX},${item.coordY})`}
            onClick={() => handleClickMatrixItem(item.number)}>
            <circle
              className={styles.circle}
              r={matrix.circleRadius}
              cx={matrix.circleRadius}
              cy={matrix.circleRadius}
            />
            <text
              dx={matrix.circleRadius}
              dy={matrix.circleRadius * 1.25}
              className={styles.text}
              style={{ fontSize: (matrix.circleRadius / 4) * 3 }}>
              {item.text}
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
};
