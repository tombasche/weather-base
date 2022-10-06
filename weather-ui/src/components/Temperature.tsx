import React from 'react';
import { round, to_unit } from '../utils';
import styled from 'styled-components';
import { TemperatureUnit } from '../types';

type Props = {
  temperature: string;
  unit: TemperatureUnit;
};

const Root = styled.div`
  font-size: 96px;
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

const Temperature = ({ temperature, unit }: Props) => {
  return (
    <Root>
      {to_unit(round(temperature), unit)}°{unitIndicator(unit)}
    </Root>
  );
};

export default Temperature;
