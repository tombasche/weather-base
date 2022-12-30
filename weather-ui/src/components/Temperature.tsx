import React from 'react';
import { toUnit } from '../utils';
import styled, { keyframes } from 'styled-components';
import { TemperatureUnit } from '../types';

type Props = {
  temperature: number;
  unit: TemperatureUnit;
};

const Shimmer = keyframes`
  100% {
    mask-position: left;
  }
`;

type RootProps = {
  animate: boolean;
};

const Root = styled.div<RootProps>`
  font-size: 96px;
  filter: brightness(125%);
  display: inline-block;
  mask: ${(props) =>
    props.animate
      ? 'linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/300% 100%'
      : 'none'};
  animation: ${Shimmer} 1s;

  &:focus {
    animation: ${Shimmer} 1s;
  }

  transition: all 1s;

  &:active {
    animation: none;
    mask: none;
  }
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
  const [animate, setAnimate] = React.useState<boolean>(true);

  // Stop gradient from appearing after first animation
  React.useEffect(() => {
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  }, []);

  return (
    <Root animate={animate} onClick={() => setAnimate(true)}>
      {toUnit(temperature, unit)}°{unitIndicator(unit)}
    </Root>
  );
};

export default Temperature;
