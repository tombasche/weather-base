import { WeatherConditionApi } from '../types';

export async function fetchLatestData<T extends WeatherConditionApi>() {
  return await fetch(
    `${process.env.REACT_APP_WEATHER_BASE_URL}/api/weather-conditions?source=outside`,
  )
    .then((response) => response.json())
    .then((data) => data as T);
}
