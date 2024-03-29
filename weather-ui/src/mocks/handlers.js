import { rest } from 'msw';
import { AGGREGATED_URL, LATEST_URL, PREDICTION_URL } from '../api/endpoint';

export const handlers = [
  rest.get(LATEST_URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        timestamp: '2022-09-27T12:57:58Z',
        temperature_c: 25,
        feels_like_c: 22,
        humidity_rh: 54,
        iaq: 12,
      }),
    );
  }),
  rest.get(AGGREGATED_URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          { temperature_c: 21, timestamp: '2022-10-24T16:00:00Z' },
          { temperature_c: 21, timestamp: '2022-10-24T17:00:00Z' },
          { temperature_c: 21, timestamp: '2022-10-24T18:00:00Z' },
          { temperature_c: 20, timestamp: '2022-10-24T19:00:00Z' },
          { temperature_c: 19, timestamp: '2022-10-24T20:00:00Z' },
          { temperature_c: 18, timestamp: '2022-10-24T21:00:00Z' },
          { temperature_c: 18, timestamp: '2022-10-24T22:00:00Z' },
          { temperature_c: 19, timestamp: '2022-10-24T23:00:00Z' },
          { temperature_c: 20, timestamp: '2022-10-24T00:00:00Z' },
          { temperature_c: 21, timestamp: '2022-10-24T01:00:00Z' },
          { temperature_c: 21, timestamp: '2022-10-24T02:00:00Z' },
          { temperature_c: 22, timestamp: '2022-10-24T03:00:00Z' },
          { temperature_c: 22, timestamp: '2022-10-24T04:00:00Z' },
          { temperature_c: 23, timestamp: '2022-10-24T05:00:00Z' },
          { temperature_c: 24, timestamp: '2022-10-24T06:00:00Z' },
          { temperature_c: 24, timestamp: '2022-10-24T07:00:00Z' },
          { temperature_c: 25, timestamp: '2022-10-24T08:00:00Z' },
          { temperature_c: 26, timestamp: '2022-10-24T09:00:00Z' },
          { temperature_c: 26, timestamp: '2022-10-24T10:00:00Z' },
          { temperature_c: 26, timestamp: '2022-10-24T11:00:00Z' },
          { temperature_c: 26, timestamp: '2022-10-24T12:00:00Z' },
          { temperature_c: 25, timestamp: '2022-10-24T13:00:00Z' },
          { temperature_c: 25, timestamp: '2022-10-24T14:00:00Z' },
          { temperature_c: 25, timestamp: '2022-10-24T15:00:00Z' },
          { temperature_c: 25, timestamp: '2022-10-24T16:00:00Z' },
        ],
      }),
    );
  }),
  rest.get(PREDICTION_URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          rain: {
            amount: 2.0,
            over: {
              time: 3,
              unit: 'hours',
            },
            at: '2023-01-05 04:00:00.000',
          },
          snow: {
            amount: 0.0,
            over: {
              time: 3,
              unit: 'hours',
            },
            at: '2023-01-05 04:00:00.000',
          },
        },
      }),
    );
  }),
];
