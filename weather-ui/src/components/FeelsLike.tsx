import React from 'react';
import styled from 'styled-components';
import { WeatherCondition } from '../types';
import { feelsLike } from '../utils';

const Root = styled.div`
  font-size: 14px;
`;

type Props = {
  data: WeatherCondition;
};

const FeelsLike = ({ data }: Props) => {
  const feelsLikeTemperature = feelsLike(
    +data.temperature_c,
    +data.humidity_rh,
  );
  return <Root>Feels like {feelsLikeTemperature}°</Root>;
};

export default FeelsLike;
