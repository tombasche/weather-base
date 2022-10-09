import { TemperatureUnit } from './types';

export const round = (value: string): number => {
  return Number((+value).toPrecision(4));
};

export const to_unit = (value: number, unit: TemperatureUnit): number => {
  switch (unit) {
    case 'FAHRENHEIT':
      return value * 1.8 + 32;
    case 'KELVIN':
      return value + 273.15;
    case 'CELSIUS':
      return value;
  }
};
