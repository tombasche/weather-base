import {
  aggregatedTemperatureFromApi,
  weatherConditionFromApi,
} from '../transformers';
import {
  AggregatedTemperature,
  AggregatedTemperatureApi,
  WeatherConditionApi,
} from '../types';
import { AGGREGATED_URL, LATEST_URL } from './endpoint';

export async function fetchLatestData<T extends WeatherConditionApi>() {
  return await fetch(`${LATEST_URL}?source=outside`)
    .then((response) => response.json())
    .then((data) => weatherConditionFromApi(data as T));
}

export async function fetchAggregatedTemperature<
  T extends AggregatedTemperatureApi,
>(startDate: string, endDate: string): Promise<AggregatedTemperature[]> {
  return await fetch(
    `${AGGREGATED_URL}?source=outside&start_date=${startDate}&end_date=${endDate}`,
  )
    .then((response) => response.json())
    .then((data) => {
      return (data.data as T[]).map((a) => aggregatedTemperatureFromApi(a));
    });
}
