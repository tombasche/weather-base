import React from 'react';

type CommaSeparatedValues = string;

const Axis = ({ points }: { points: CommaSeparatedValues }) => (
  <polyline fill="none" stroke="#bababa" strokeWidth=".5" points={points} />
);

type Props = {
  values: number[];
};

const Chart = ({ values }: Props) => {
  const data = values.map((v: number, idx: number) => {
    return { x: idx, y: v };
  });

  const maximumXFromData = values.length;

  const maximumYFromData = Math.max(...data.map((e) => e.y));

  const chartWidth = 300;
  const chartHeight = 5000;
  const padding = 20;

  const points = data
    .map((element) => {
      const x = (element.x / maximumXFromData) * chartWidth + padding;
      const y =
        chartHeight - (element.y / maximumYFromData) * chartHeight + padding;

      return `${x},${y}`;
    })
    .join(' ');
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={chartWidth}
      height={chartHeight / 2}
    >
      <Axis points={points} />
    </svg>
  );
};

export default Chart;
