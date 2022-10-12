export type WeatherCondition = {
  timestamp: string;
  pressure_pa: string;
  temperature_c: string;
  humidity_rh: string;
  dew_point_c: string;
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
