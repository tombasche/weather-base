import { AirQualityRating, TemperatureUnit, TimeOfDay } from './types';

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

export const timeOfDay = (timestamp: Date): TimeOfDay => {
  const month = timestamp.getMonth() + 1;
  const isSummer = month > 5 && month <= 8;

  const hours = timestamp.getHours();

  if (hours >= 12 && hours < 17) return 'DAY';
  if (hours >= 19 && isSummer) return 'DAY';
  if (hours >= 17) return 'NIGHT';

  return 'MORNING';
};

export const airQuality = (iaq: number): AirQualityRating => {
  if (iaq <= 50) return 'GOOD';
  if (iaq <= 100) return 'MODERATE';
  if (iaq <= 150) return 'UNHEALTHY_SENSITIVE';
  if (iaq <= 200) return 'UNHEALTHY';
  if (iaq <= 300) return 'VERY_UNHEALTHY';

  return 'HAZARDOUS';
};
