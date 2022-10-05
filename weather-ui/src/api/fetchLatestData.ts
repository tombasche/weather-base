import { WeatherCondition } from '../types';

export async function fetchLatestData<T extends WeatherCondition>() {
  return await fetch(
    `${process.env.REACT_APP_WEATHER_BASE_URL}/api/weather-conditions`,
  )
    .then((response) => response.json())
    .then((data) => data as T);
}
