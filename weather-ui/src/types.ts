export type WeatherConditionApi = {
  timestamp: string;
  temperature_c: number;
  feels_like_c: number;
  humidity_rh: number;
  iaq: number;
};

export type TemperatureUnit = 'CELSIUS' | 'FAHRENHEIT' | 'KELVIN';

export type ClockDisplay = '24H' | '12H';

export type Settings = {
  temperatureUnit: TemperatureUnit;
  clockDisplay: ClockDisplay;
};

export type TimeOfDay = 'MORNING' | 'DAY' | 'NIGHT';

export type AirQualityRating =
  | 'GOOD'
  | 'MODERATE'
  | 'UNHEALTHY_SENSITIVE'
  | 'UNHEALTHY'
  | 'VERY_UNHEALTHY'
  | 'HAZARDOUS';
