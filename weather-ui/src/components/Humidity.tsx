import React from 'react';
import styled from 'styled-components';
import HumidityImage from '../images/HumidityImage';

type Props = {
  humidity: number;
};

const fontSize = '16px';

const Root = styled.div`
  font-size: ${fontSize};
  width: 100px;
`;

const Text = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
`;

const Recommendation = styled.p`
  font-size: 11px;
`;

const Humidity = ({ humidity }: Props) => (
  <Root>
    <Text>
      {humidity}% <HumidityImage size={fontSize} />{' '}
      <Recommendation>(40 - 50%)</Recommendation>
    </Text>
  </Root>
);

export default Humidity;
