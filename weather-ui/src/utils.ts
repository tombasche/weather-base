import {
  AirQualityRating,
  Rain,
  Snow,
  TemperatureUnit,
  TimeOfDay,
} from './types';

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

const hoursAmPm = (timestamp: Date): string => {
  const hours12h = (hours: number) => {
    if (hours === 0) return 0;
    if (hours === 12) return 12;

    return hours % 12;
  };
  const amPm = timestamp.getHours() >= 12 ? 'pm' : 'am';
  return `${hours12h(timestamp.getHours())}${amPm}`;
};

export const dateForXAxisTick = (timestamp: Date): string => {
  const date = timestamp.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
  return `${hoursAmPm(timestamp)} ${date}`;
};

const LAST_DAY_H = 12;

type AggregatedGraphFromTo = [string, string];

export const datesForAggregatedGraphFrom = (
  to: Date,
): AggregatedGraphFromTo => {
  const toNew = new Date(to.getTime());
  const from = new Date(to.getTime());
  from.setHours(to.getHours() - LAST_DAY_H);
  return [from, toNew].map((d) => d.toISOString()) as AggregatedGraphFromTo;
};

const PREDICTION_TIME_PERIOD_H = 24;

type PredictionFromTo = [string, string];

export const datesForPredictionsFrom = (to: Date): PredictionFromTo => {
  const toNew = new Date(to.getTime());
  const from = new Date(to.getTime());
  toNew.setHours(to.getHours() + PREDICTION_TIME_PERIOD_H);
  return [from, toNew].map((d) => d.toISOString()) as AggregatedGraphFromTo;
};

export const predictionMessage = (
  data: Snow | Rain,
  type: 'snow' | 'rain',
): string => {
  const unit = type === 'snow' ? 'cm' : 'mm';

  const icon = type === 'snow' ? '❄️' : '🌧️';

  const amount = `${data.amount} ${unit}`;

  // Move to Helsinki timezone
  const date = addHours(new Date(data.at), 2);

  return `${icon} ${amount} at ${hoursAmPm(date)} for ${data.over.time} ${
    data.over.unit
  }`;
};

const addHours = (d: Date, h: number) => {
  d.setTime(d.getTime() + h * 60 * 60 * 1000);
  return d;
};
