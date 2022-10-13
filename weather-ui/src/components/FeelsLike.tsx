import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  font-size: 14px;
  padding-right: 38px;
`;

type Props = {
  feelsLike: number;
};

const FeelsLike = ({ feelsLike }: Props) => {
  return <Root>Feels like {feelsLike}°</Root>;
};

export default FeelsLike;
