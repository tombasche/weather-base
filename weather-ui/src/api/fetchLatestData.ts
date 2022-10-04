import React from 'react';
import { WeatherCondition } from '../types';

export const fetchLatestData = async () =>
  await fetch('http://localhost:4000/api/weather-conditions')
    .then((response) => response.json())
    .then((data) => data as WeatherCondition);
