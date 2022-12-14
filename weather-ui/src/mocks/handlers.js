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
        latitude: 60.16998,
        longitude: 24.94519,
        generationtime_ms: 0.39196014404296875,
        utc_offset_seconds: 7200,
        timezone: 'Europe/Helsinki',
        timezone_abbreviation: 'EET',
        elevation: 7.0,
        hourly_units: { time: 'iso8601', snowfall: 'cm', rain: 'mm' },
        hourly: {
          time: [
            '2023-01-05T00:00',
            '2023-01-05T01:00',
            '2023-01-05T02:00',
            '2023-01-05T03:00',
            '2023-01-05T04:00',
            '2023-01-05T05:00',
            '2023-01-05T06:00',
            '2023-01-05T07:00',
            '2023-01-05T08:00',
            '2023-01-05T09:00',
            '2023-01-05T10:00',
            '2023-01-05T11:00',
            '2023-01-05T12:00',
            '2023-01-05T13:00',
            '2023-01-05T14:00',
            '2023-01-05T15:00',
            '2023-01-05T16:00',
            '2023-01-05T17:00',
            '2023-01-05T18:00',
            '2023-01-05T19:00',
            '2023-01-05T20:00',
            '2023-01-05T21:00',
            '2023-01-05T22:00',
            '2023-01-05T23:00',
            '2023-01-06T00:00',
            '2023-01-06T01:00',
            '2023-01-06T02:00',
            '2023-01-06T03:00',
            '2023-01-06T04:00',
            '2023-01-06T05:00',
            '2023-01-06T06:00',
            '2023-01-06T07:00',
            '2023-01-06T08:00',
            '2023-01-06T09:00',
            '2023-01-06T10:00',
            '2023-01-06T11:00',
            '2023-01-06T12:00',
            '2023-01-06T13:00',
            '2023-01-06T14:00',
            '2023-01-06T15:00',
            '2023-01-06T16:00',
            '2023-01-06T17:00',
            '2023-01-06T18:00',
            '2023-01-06T19:00',
            '2023-01-06T20:00',
            '2023-01-06T21:00',
            '2023-01-06T22:00',
            '2023-01-06T23:00',
          ],
          snowfall: [
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
          ],
          rain: [
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
          ],
        },
      }),
    );
  }),
];
