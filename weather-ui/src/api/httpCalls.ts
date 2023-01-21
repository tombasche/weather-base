import {
  aggregatedTemperatureFromApi,
  weatherConditionFromApi,
} from '../transformers';
import {
  AggregatedTemperature,
  AggregatedTemperatureApi,
  PredictionApi,
  WeatherConditionApi,
} from '../types';
import { AGGREGATED_URL, LATEST_URL, PREDICTION_URL } from './endpoint';

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

export async function fetchPrediction<T extends PredictionApi>(
  startDate: string,
  endDate: string,
): Promise<PredictionApi | undefined> {
  const hasData = (d: { data: Object }) => Object.keys(d).length !== 0;

  return await fetch(
    `${PREDICTION_URL}?start_date=${startDate}&end_date=${endDate}`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (!hasData(data.data)) {
        return undefined;
      } else {
        return data.data as T;
      }
    });
}
