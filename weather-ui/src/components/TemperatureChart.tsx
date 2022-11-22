import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { TimeSeries } from '../types';
import { dateForXAxisTick } from '../utils';

type Props = {
  data: TimeSeries;
};

const tickFormatter = (val: Date | string | number): string => {
  if (typeof val === 'string') return '';
  if (typeof val === 'number') return '';
  return dateForXAxisTick(val);
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
        tickFormatter={(v: Date | string | number) =>
          v === 'auto' || v === 0 ? '' : tickFormatter(v)
        }
      />
      <YAxis />
    </LineChart>
  );
};
