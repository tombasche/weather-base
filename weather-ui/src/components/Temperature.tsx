import React from 'react';
import { round } from '../utils';

type Props = {
  temperature: string | undefined;
};

const Temperature = ({ temperature }: Props) => {
  if (temperature === undefined) {
    return <p>loading ... </p>;
  }

  return <div data-testid="temperature">{round(temperature)}°</div>;
};

export default Temperature;
