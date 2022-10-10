import { TemperatureUnit } from './types';

export const round = (value: string): number => {
  return Number((+value).toPrecision(2));
};

const roundValue = (value: number): number => {
  return +value.toPrecision(2);
};

export const toUnit = (value: number, unit: TemperatureUnit): number => {
  switch (unit) {
    case 'FAHRENHEIT':
      return value * 1.8 + 32;
    case 'KELVIN':
      return value + 273.15;
    case 'CELSIUS':
      return value;
  }
};

export const toCelsiusFromFahrenheit = (value: number) => {
  return roundValue((value - 32) / 1.8);
};

export const feelsLike = (
  temperature: number,
  relativeHumidity: number,
): number => {
  const tempF = toUnit(temperature, 'FAHRENHEIT');

  return toCelsiusFromFahrenheit(
    -42.379 +
      2.049 * tempF +
      10.1433 * relativeHumidity -
      0.2248 * tempF * relativeHumidity -
      0.0068378 * tempF ** 2 -
      0.05481717 * relativeHumidity ** 2 +
      0.00122874 * tempF ** 2 * relativeHumidity +
      0.00085282 * tempF * relativeHumidity ** 2 -
      0.00000199 * tempF ** 2 * relativeHumidity ** 2,
  );
};
