import React from 'react';
import { toUnit } from '../utils';
import styled from 'styled-components';
import { TemperatureUnit } from '../types';

type Props = {
  temperature: number;
  unit: TemperatureUnit;
};

const Root = styled.div`
  font-size: 96px;
  filter: brightness(125%);
`;

const unitIndicator = (unit: TemperatureUnit) => {
  switch (unit) {
    case 'FAHRENHEIT':
      return 'F';
    case 'KELVIN':
      return 'K';
    case 'CELSIUS':
      return '';
  }
};

const Temperature = ({ temperature, unit }: Props) => (
  <Root>
    {toUnit(temperature, unit)}°{unitIndicator(unit)}
  </Root>
);

export default Temperature;
