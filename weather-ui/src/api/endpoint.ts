export const BASE_URL = `${process.env.REACT_APP_WEATHER_BASE_URL}/api`;
export const LATEST_URL = `${BASE_URL}/weather-conditions`;
export const AGGREGATED_URL = `${BASE_URL}/weather-conditions-aggregated`;

const BASE_PREDICTION_URL = process.env.REACT_APP_PREDICTION_BASE_URL
const helsinkiLat = 60.17
const helsinkiLon = 24.94
export const PREDICTION_URL = `${BASE_PREDICTION_URL}/v1/forecast?latitude=${helsinkiLat}&longitude=${helsinkiLon}&hourly=snowfall,rain&timezone=Europe/Helsinki`
