export type WeatherCondition = {
  timestamp: string;
  altitude_m: string;
  pressure_pa: string;
  temperature_c: string;
  humidity_rh: string;
  dew_point_c: string;
  gas_resistance_ohms: string;
  pressure_pa_historical: number[];
};

export type TemperatureUnit = 'CELSIUS' | 'FAHRENHEIT' | 'KELVIN';

export type ClockDisplay = '24H' | '12H';

export type Settings = {
  temperatureUnit: TemperatureUnit;
  clockDisplay: ClockDisplay;
};
