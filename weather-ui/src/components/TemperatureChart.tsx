import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import { TimeSeries } from '../types';
import { dateForXAxisTick } from '../utils';

type Props = {
  data: TimeSeries;
};

const Container = styled.div`
  width: 100%;
  height: 50%;

  margin-left: -24px;
`;

const tickFormatter = (val: Date | string | number): string => {
  if (typeof val === 'string') return '';
  if (typeof val === 'number') return '';
  return dateForXAxisTick(val);
};

export const TemperatureChart = ({ data }: Props) => {
  return (
    <Container>
      <ResponsiveContainer width="95%" height="80%" maxHeight={500}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="white"
            strokeWidth={2}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(v: Date | string | number) =>
              v === 'auto' || v === 0 ? '' : tickFormatter(v)
            }
          />
          <YAxis tickMargin={0} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};
