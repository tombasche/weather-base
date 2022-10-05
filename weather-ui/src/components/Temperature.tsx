import React from 'react';
import { round } from '../utils';

type Props = {
  temperature: string;
};

const Temperature = ({ temperature }: Props) => {
  return <div data-testid="temperature">{round(temperature)}°</div>;
};

export default Temperature;
