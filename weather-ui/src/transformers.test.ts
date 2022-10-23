import { weatherConditionFromApi } from './transformers';
import { WeatherCondition } from './types';

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
