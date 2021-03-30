import { red, green, blue } from 'chalk';

export interface GetChartCountIndicatorProps {
  message: string;
  maxCount: number;
}

const getCharCountIndicator = ({
  message,
  maxCount,
}: GetChartCountIndicatorProps): string => {
  if (maxCount === Infinity) {
    return '';
  }
  const currentCount = message.length
    .toString()
    .padStart(maxCount.toString().length, '0');
  const coloredCurrentCount =
    message.length > maxCount ? red(currentCount) : green(currentCount);
  const coloredMaxCount = blue(maxCount);
  return `(${coloredCurrentCount}/${coloredMaxCount})`;
};

export default getCharCountIndicator;
