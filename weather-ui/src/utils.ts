import { TemperatureUnit } from './types';

export const round = (value: string): number => {
  return Number((+value).toPrecision(2));
};

export const to_unit = (value: number, unit: TemperatureUnit): number => {
  if (unit === 'FAHRENHEIT') {
    return value * 1.8 + 32;
  }
};
