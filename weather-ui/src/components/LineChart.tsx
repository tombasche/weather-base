import React from 'react';
import { TimeSeries } from '../types';

const STROKE = 0.1;
const PRECISION = 1;
const HORIZONTAL_GUIDES = 6;
const VERTICAL_GUIDES = 12;

type Props = {
  data: TimeSeries[];
  title: string;
  height: number;
  width: number;
};

const LineChart = ({ data, title, height, width }: Props) => {
  const FONT_SIZE = width / 100;
  const maximumXFromData = Math.max(...data.map((e) => e.value));
  const maximumYFromData = Math.max(...data.map((e) => e.value));

  const digits =
    parseFloat(maximumYFromData.toString()).toFixed(PRECISION).length + 1;

  const padding = (FONT_SIZE + digits) * 3;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data
    .map((element, idx) => {
      const x = (idx / maximumXFromData) * chartWidth + padding;
      const y =
        chartHeight -
        (element.value / maximumYFromData) * chartHeight +
        padding;
      return `${x},${y}`;
    })
    .join(' ');
  const Axis = ({ points }: { points: string }) => (
    <polyline
      fill="none"
      stroke="#bababa"
      strokeWidth={STROKE}
      points={points}
    />
  );

  const XAxis = () => (
    <Axis
      points={`${padding},${height - padding} ${width - padding},${
        height - padding
      }`}
    />
  );

  const YAxis = () => (
    <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
  );

  const VerticalGuides = () => {
    const guideCount = VERTICAL_GUIDES || data.length - 1;

    const startY = padding;
    const endY = height - padding;

    return new Array(guideCount).fill(0).map((_, index) => {
      const ratio = (index + 1) / guideCount;

      const xCoordinate = padding + ratio * (width - padding * 2);
      return (
        <React.Fragment key={index}>
          <polyline
            fill="none"
            stroke="#ccc"
            strokeWidth={STROKE}
            points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
          />
        </React.Fragment>
      );
    });
  };

  const HorizontalGuides = () => {
    const startX = padding;
    const endX = width - padding;

    return new Array(HORIZONTAL_GUIDES).fill(0).map((_, index) => {
      const ratio = (index + 1) / HORIZONTAL_GUIDES;

      const yCoordinate = chartHeight - chartHeight * ratio + padding;

      return (
        <React.Fragment key={index}>
          <polyline
            fill="none"
            stroke={'#ccc'}
            strokeWidth={STROKE}
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </React.Fragment>
      );
    });
  };

  const LabelsXAxis = () => {
    const y = height - padding + FONT_SIZE * 2;

    return data.map((element, index) => {
      const x =
        (index / maximumXFromData) * chartWidth + padding - FONT_SIZE / 2;
      return (
        <text
          key={index}
          x={x}
          y={y}
          style={{
            fill: '#808080',
            fontSize: FONT_SIZE,
            fontFamily: 'Helvetica',
          }}
        >
          {element.timestamp.getHours()}
        </text>
      );
    });
  };

  const LabelsYAxis = () => {
    const PARTS = HORIZONTAL_GUIDES;
    return new Array(PARTS + 1).fill(0).map((_, index) => {
      const x = FONT_SIZE + 14;
      const ratio = index / HORIZONTAL_GUIDES;
      const yCoordinate =
        chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2;

      return (
        <text
          key={index}
          x={x}
          y={yCoordinate}
          style={{
            fill: '#808080',
            fontSize: FONT_SIZE,
            fontFamily: 'Helvetica',
          }}
        >
          {/* @ts-ignore */}
          {parseFloat(maximumYFromData * (index / PARTS)).toFixed(PRECISION)}
        </text>
      );
    });
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <title>{title}</title>
      <XAxis />
      {/* @ts-ignore */}
      <LabelsXAxis />
      <YAxis />
      {/* @ts-ignore */}
      <LabelsYAxis />
      {/* @ts-ignore */}
      {VERTICAL_GUIDES && <VerticalGuides />}
      {/* @ts-ignore */}
      <HorizontalGuides />

      <polyline
        fill="none"
        stroke="#0074d9"
        strokeWidth={STROKE}
        points={points}
      />
    </svg>
  );
};

export default LineChart;
