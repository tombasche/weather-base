import React from 'react';
import { AirQualityRating } from '../types';
import { airQuality } from '../utils';

type Props = {
  iaq: number;
};

const readableRating = (rating: AirQualityRating): string => {
  switch (rating) {
    case 'GOOD':
      return 'good 😌';
    case 'MODERATE':
      return 'moderate 😐';
    case 'UNHEALTHY_SENSITIVE':
      return 'unhealthy for sensitive groups 👶👴';
    case 'UNHEALTHY':
      return 'unhealthy 🤢';
    case 'VERY_UNHEALTHY':
      return 'very unhealthy 🤮';
    case 'HAZARDOUS':
      return 'hazardous ☢️';
  }
};

const AirQuality = ({ iaq }: Props) => (
  <div>Air quality is {readableRating(airQuality(iaq))}</div>
);

export default AirQuality;
