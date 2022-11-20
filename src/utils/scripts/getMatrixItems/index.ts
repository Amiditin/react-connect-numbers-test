import { matrixDefault } from '../../constants';
import { GetIntervalExtremum, GetMatrixItems, IMatrixItem, Interval } from './types';

const LETTERS = [
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Е',
  'Ё',
  'Ж',
  'З',
  'И',
  'Й',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ф',
  'Х',
  'Ц',
  'Ч',
  'Ш',
  'Щ',
  'Ъ',
  'Ы',
  'Ь',
  'Э',
  'Ю',
  'Я',
];

const COEFFICIENT_MAX_RADIUS = 0.3;
const DISTANCE_FROM_BORDERS = 10;

function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getMatrixItems: GetMatrixItems = (
  withLetters = false,
  numberItems = 24,
  matrixOptions = matrixDefault,
) => {
  const { circleRadius, height, width } = matrixOptions;

  const distanceFromBorder = circleRadius + DISTANCE_FROM_BORDERS;

  const getIntervalExtremum: GetIntervalExtremum = (coord, maxDistance, type) => {
    let coordExtremum: number;

    if (type === 'min') {
      coordExtremum = coord - maxDistance * COEFFICIENT_MAX_RADIUS;

      return coordExtremum > distanceFromBorder ? coordExtremum : distanceFromBorder;
    }

    coordExtremum = coord + maxDistance * COEFFICIENT_MAX_RADIUS;

    return coordExtremum < maxDistance - distanceFromBorder
      ? coordExtremum
      : maxDistance - distanceFromBorder;
  };

  let items: IMatrixItem[] = [
    {
      active: true,
      coordX: getRandomNumber(
        matrixOptions.width * COEFFICIENT_MAX_RADIUS,
        matrixOptions.width * (1 - COEFFICIENT_MAX_RADIUS),
      ),
      coordY: getRandomNumber(
        matrixOptions.height * COEFFICIENT_MAX_RADIUS,
        matrixOptions.height * (1 - COEFFICIENT_MAX_RADIUS),
      ),
      number: 1,
      text: '1',
    },
  ];

  for (let i = 1; i < numberItems; i++) {
    let interval: Interval = {
      width: {
        min: getIntervalExtremum(items[i - 1].coordX, width, 'min'),
        max: getIntervalExtremum(items[i - 1].coordX, width, 'max'),
      },
      height: {
        min: getIntervalExtremum(items[i - 1].coordY, height, 'min'),
        max: getIntervalExtremum(items[i - 1].coordY, height, 'max'),
      },
    };

    let coordX: number;
    let coordY: number;
    let numberIterations = 0;

    while (true) {
      if (numberIterations > 100) {
        interval = {
          width: { min: distanceFromBorder, max: width - distanceFromBorder },
          height: { min: distanceFromBorder, max: height - distanceFromBorder },
        };
      }

      coordX = getRandomNumber(interval.width.min, interval.width.max);
      coordY = getRandomNumber(interval.height.min, interval.height.max);

      let badCoords = false;

      for (let j = 0; j < items.length; j++) {
        const distance = Math.sqrt(
          Math.pow(items[j].coordX - coordX, 2) + Math.pow(items[j].coordY - coordY, 2),
        );

        if (distance < circleRadius * 3) {
          badCoords = true;
          break;
        }
      }

      if (badCoords) {
        numberIterations += 1;
        continue;
      }

      break;
    }

    let text = String(i + 1);

    if (withLetters) {
      text = i % 2 === 0 ? String(i / 2 + 1) : LETTERS[Math.floor(i / 2)];
    }

    items.push({
      active: false,
      coordX: coordX,
      coordY: coordY,
      number: i + 1,
      text,
    });
  }

  return items;
};
