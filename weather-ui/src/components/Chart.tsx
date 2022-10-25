/*

    This component isn't used anywhere, but I'd like to keep it
    in case I find a use for it. It looks pretty nice honestly, but
    we'd have to have the backend aggregate data and send it back along with the regular payload
    and it seems kind of weird to be honest.

    Maybe a separate endpoint for the aggregated data might be best, in which case
    there'd have to be some re-architecting (as I assumed only a single endpoint or 'fetchMethod' would
    service the UI).

*/
import React from 'react';

type CommaSeparatedValues = string;

const Axis = ({ points }: { points: CommaSeparatedValues }) => (
  <polyline fill="none" stroke="#bababa" strokeWidth=".5" points={points} />
);

type Props = {
  title: string;
  values: number[];
};

const Chart = ({ title, values }: Props) => {
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
      <title>{title}</title>
      <Axis points={points} />
    </svg>
  );
};

export default Chart;
