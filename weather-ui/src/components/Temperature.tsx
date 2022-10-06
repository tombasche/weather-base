import React from 'react';
import { round } from '../utils';
import styled from 'styled-components';

type Props = {
  temperature: string;
};

const Root = styled.div`
  font-size: 96px;
`;

const Temperature = ({ temperature }: Props) => {
  return <Root>{round(temperature)}°</Root>;
};

export default Temperature;
