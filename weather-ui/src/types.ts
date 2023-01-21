export type WeatherConditionApi = {
  timestamp: string;
  temperature_c: number;
  feels_like_c: number;
  humidity_rh: number;
  iaq: number;
};

export type WeatherCondition = {
  timestamp: Date;
  temperature: number;
  feelsLike: number;
  humidity: number;
  iaq: number;
};

export type TemperatureUnit = 'CELSIUS' | 'FAHRENHEIT' | 'KELVIN';

export type ClockDisplay = '24H' | '12H';

export type TimeOfDay = 'MORNING' | 'DAY' | 'NIGHT';

export type AirQualityRating =
  | 'GOOD'
  | 'MODERATE'
  | 'UNHEALTHY_SENSITIVE'
  | 'UNHEALTHY'
  | 'VERY_UNHEALTHY'
  | 'HAZARDOUS';

interface DataPoint {
  value: number;
  timestamp: Date;
}

export type TimeSeries = DataPoint[];

export type AggregatedTemperature = {
  value: number;
  timestamp: Date;
};

export type AggregatedTemperatureApi = {
  temperature_c: number;
  timestamp: string;
};

type Unit = 'hours';

type PredictionData = {
  amount: number;
  over: {
    time: number;
    unit: Unit;
  };
  at: string;
};

export type Snow = PredictionData;
export type Rain = PredictionData;

export type PredictionApi = {
  rain: Rain;
  snow: Snow;
};
