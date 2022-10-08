import { WeatherCondition } from '../types';

export class HttpError extends Error {
  constructor(message: string, httpCode: string) {
    super(message);
    this.name = httpCode;
  }
}

export async function fetchLatestData<T extends WeatherCondition>() {
  return await fetch(
    `${process.env.REACT_APP_WEATHER_BASE_URL}/api/weather-conditions`,
  )
    .then((response) => response.json())
    .then((data) => data as T);
}
