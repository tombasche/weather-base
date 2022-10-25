import { weatherConditionFromApi } from '../transformers';
import { WeatherConditionApi } from '../types';
import { LATEST_URL } from './endpoint';

export async function fetchLatestData<T extends WeatherConditionApi>() {
  return await fetch(`${LATEST_URL}?source=outside`)
    .then((response) => response.json())
    .then((data) => weatherConditionFromApi(data as T));
}
