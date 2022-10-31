import React from 'react';
import { TimeSeries } from '../types';

type CommaSeparatedValues = string;

const Axis = ({ points }: { points: CommaSeparatedValues }) => (
  <polyline fill="none" stroke="#bababa" strokeWidth="2" points={points} />
);

type Props = {
  title: string;
  values: TimeSeries[];
};

const Chart = ({ title, values }: Props) => {
  const data = values.map((ts, idx) => {
    return { x: ts.value, y: idx };
  });

  const maximumXFromData = values.length;

  const maximumYFromData = Math.max(...data.map((e) => e.y));

  const chartWidth = 300;
  const chartHeight = 2000;
  const padding = 20;

  const points = data
    .map((element) => {
      const x = (element.x / maximumXFromData) * chartWidth + padding;
      const y =
        chartHeight - (element.y / maximumYFromData) * chartHeight + padding;

      return `${x},${y}`;
    })
    .join(' ');

  const XAxis = () => (
    <Axis
      points={`${padding},${chartHeight - padding} ${chartWidth - padding},${
        chartHeight - padding
      }`}
    />
  );

  const YAxis = () => (
    <Axis
      points={`${padding},${padding} ${padding},${chartHeight - padding}`}
    />
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={chartWidth}
      height={chartHeight / 2}
    >
      <title>{title}</title>
      <XAxis />
      <YAxis />
      <Axis points={points} />
    </svg>
  );
};

export default Chart;
