import { WeatherCondition, WeatherConditionApi } from './types';

export const weatherConditionFromApi = (
  apiResponse: WeatherConditionApi,
): WeatherCondition => {
  return {
    timestamp: new Date(apiResponse.timestamp),
    temperature: apiResponse.temperature_c,
    feelsLike: apiResponse.feels_like_c,
    humidity: apiResponse.humidity_rh,
    iaq: apiResponse.iaq,
  };
};
