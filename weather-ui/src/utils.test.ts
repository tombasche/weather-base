import { PredictionApi } from './types';
import {
  airQuality,
  dateForXAxisTick,
  datesForAggregatedGraphFrom,
  datesForPredictionsFrom,
  predictionMessage,
  timeOfDay,
  toUnit,
} from './utils';

describe('temperature conversion', () => {
  it('converts celsius to fahrenheit', () => {
    const temperature = 0;
    expect(toUnit(temperature, 'FAHRENHEIT')).toBe(32);
  });

  it('converts celsius to kelvin', () => {
    const temperature = 0;
    expect(toUnit(temperature, 'KELVIN')).toBe(273.15);
  });

  it('returns unchanged value celsius to celsius', () => {
    const temperature = 0;
    expect(toUnit(temperature, 'CELSIUS')).toBe(0);
  });
});

describe('time of day', () => {
  it('tells when it is morning', () => {
    const timestamp = new Date('2022-09-27T8:57:58Z');

    const result = timeOfDay(timestamp);

    expect(result).toBe('MORNING');
  });

  it('tells when it is day / afternoon', () => {
    const timestamp = new Date('2022-09-27T12:57:58Z');

    const result = timeOfDay(timestamp);

    expect(result).toBe('DAY');
  });

  it('tells when it is night', () => {
    const timestamp = new Date('2022-09-27T17:57:58Z');

    const result = timeOfDay(timestamp);

    expect(result).toBe('NIGHT');
  });

  describe('summer', () => {
    it('when its still light out', () => {
      const timestamp = new Date('2022-06-27T19:57:58Z');

      const result = timeOfDay(timestamp);

      expect(result).toBe('DAY');
    });
  });
});

describe('air quality', () => {
  it('good', () => {
    expect(airQuality(25)).toBe('GOOD');
  });
  it('moderate', () => {
    expect(airQuality(95)).toBe('MODERATE');
  });
  it('unhealthy for sensitive groups', () => {
    expect(airQuality(125)).toBe('UNHEALTHY_SENSITIVE');
  });
  it('unhealthy', () => {
    expect(airQuality(175)).toBe('UNHEALTHY');
  });
  it('very unhealthy', () => {
    expect(airQuality(250)).toBe('VERY_UNHEALTHY');
  });
  it('hazardous', () => {
    expect(airQuality(400)).toBe('HAZARDOUS');
  });
});

describe('chart date display for x-axis', () => {
  it('converts a date into a short format', () => {
    const timestamp = new Date('2022-09-27T12:57:58Z');

    const result = dateForXAxisTick(timestamp);

    expect(result).toBe('3pm 27 Sept');
  });
});

describe('get dates for aggregated time series', () => {
  it('gets 2 dates for the aggregated time series', () => {
    const now = new Date('2022-09-27T12:57:58Z');

    const result = datesForAggregatedGraphFrom(now);
    expect(result[0]).toBe('2022-09-27T00:57:58.000Z');
    expect(result[1]).toBe('2022-09-27T12:57:58.000Z');
  });
});

describe('get dates for predicted precipitation', () => {
  it('gets 2 dates for the prediction query', () => {
    const now = new Date('2022-09-27T12:57:58Z');

    const result = datesForPredictionsFrom(now);
    expect(result[0]).toContain('2022-09-27');
    expect(result[1]).toContain('2022-09-28');
  });
});

describe('prediction message', () => {
  const predictionApi: PredictionApi = {
    rain: {
      amount: 1.0,
      over: {
        time: 3,
        unit: 'hours',
      },
      at: '2023-01-05 04:00:00.000',
    },
    snow: {
      amount: 1.0,
      over: {
        time: 3,
        unit: 'hours',
      },
      at: '2023-01-05 04:00:00.000',
    },
  };

  it('takes the snow prediction data and formats it in to a message', () => {
    const message = predictionMessage(predictionApi.snow, 'snow');

    expect(message).toContain('❄️');
    expect(message).toContain('1 cm');
    expect(message).toContain('am');
    expect(message).toContain('3 hours');
  });
  it('takes the rain prediction data and formats it in to a message', () => {
    const message = predictionMessage(predictionApi.rain, 'rain');

    expect(message).toContain('🌧️');
    expect(message).toContain('1 mm');
    expect(message).toContain('am');
    expect(message).toContain('3 hours');
  });
});
