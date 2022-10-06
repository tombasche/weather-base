import React from 'react';
import { round } from '../utils';
import styled from 'styled-components';
import { TemperatureUnit } from '../types';

type Props = {
  temperature: string;
  unit: TemperatureUnit;
};

const Root = styled.div`
  font-size: 96px;
`;

const Temperature = ({ temperature, unit = 'CELSIUS' }: Props) => {
  return <Root>{round(temperature)}°</Root>;
};

export default Temperature;
