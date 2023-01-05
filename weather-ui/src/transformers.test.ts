import {
  aggregatedTemperatureFromApi,
  predictionFromApi,
  weatherConditionFromApi,
} from './transformers';
import { AggregatedTemperature, WeatherCondition } from './types';

describe('WeatherCondition', () => {
  it('can be transformed from the API response', () => {
    const weatherConditionApiResponse = {
      timestamp: '2022-09-27T16:57:58Z',
      temperature_c: 25,
      feels_like_c: 22,
      humidity_rh: 54,
      iaq: 12,
    };

    const expectedWeatherCondition: WeatherCondition = {
      timestamp: new Date('2022-09-27T16:57:58Z'),
      temperature: 25,
      feelsLike: 22,
      humidity: 54,
      iaq: 12,
    };

    const result = weatherConditionFromApi(weatherConditionApiResponse);
    expect(result).toEqual(expectedWeatherCondition);
  });
});

describe('AggregatedTemperature', () => {
  it('can be transformed from the API response', () => {
    const aggregatedTemperatureApiResponse = {
      timestamp: '2022-09-27T16:57:58Z',
      temperature_c: 25,
    };

    const expectedAggregatedTemperature: AggregatedTemperature = {
      timestamp: new Date('2022-09-27T16:57:58Z'),
      value: 25,
    };

    const result = aggregatedTemperatureFromApi(
      aggregatedTemperatureApiResponse,
    );
    expect(result).toEqual(expectedAggregatedTemperature);
  });
});

describe('Prediction', () => {
  it('can be transformed from the API response', () => {
    const predictionApiResponse = {
      latitude: 60.16998,
      longitude: 24.94519,
      generationtime_ms: 0.39196014404296875,
      utc_offset_seconds: 7200,
      timezone: 'Europe/Helsinki',
      timezone_abbreviation: 'EET',
      elevation: 7.0,
      hourly_units: { time: 'iso8601', snowfall: 'cm', rain: 'mm' },
      hourly: {
        time: ['2023-01-05T00:00'],
        snowfall: [0.0],
        rain: [5.0],
      },
    };

    const expectedPrediction = {
      snowfall: false,
      rain: true,
    };

    const result = predictionFromApi(predictionApiResponse);
    expect(result).toStrictEqual(expectedPrediction);
  });
});
