import React from 'react';
import styled from 'styled-components';
import { PredictionApi, Snow, Rain } from '../types';
import { predictionMessage } from '../utils';

type Props = {
  prediction: PredictionApi;
};

const Root = styled.div`
  font-size: 14px;
`;

const hasValue = (data: Snow | Rain): boolean => data.amount > 0.0;

const SnowDisplay = (snow: Snow) => {
  return <div>{predictionMessage(snow, 'snow')}</div>;
};

const RainDisplay = (rain: Rain) => {
  return <div>{predictionMessage(rain, 'rain')}</div>;
};

const Prediction = ({ prediction }: Props) => {
  const snowDisplay = hasValue(prediction.snow)
    ? SnowDisplay(prediction.snow)
    : null;

  const rainDisplay = hasValue(prediction.rain)
    ? RainDisplay(prediction.rain)
    : null;
  return (
    <Root>
      {snowDisplay} {rainDisplay}
    </Root>
  );
};

export default Prediction;
