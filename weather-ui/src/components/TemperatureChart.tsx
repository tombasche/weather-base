import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TimeSeries } from '../types';
import { dateForXAxisTick } from '../utils';

type Props = {
  data: TimeSeries;
};

export const TemperatureChart = ({ data }: Props) => {
  return (
    <LineChart
      data={data}
      width={1000}
      height={300}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <Line type="monotone" dataKey="value" stroke="black" strokeWidth={2} />
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(val: Date) => dateForXAxisTick(val)}
      />
      <YAxis />
    </LineChart>
  );
};
