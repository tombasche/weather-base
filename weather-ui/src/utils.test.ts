import {
  airQuality,
  feelsLike,
  round,
  timeOfDay,
  toCelsiusFromFahrenheit,
  toUnit,
} from './utils';

describe('rounding', () => {
  it('rounds a string to significant figure', () => {
    const temperature = '24.99234208324';
    expect(round(temperature)).toBe(25);
  });
});

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

  it('converts from fahrenheit back to celsius', () => {
    const temperature = 32;
    expect(toCelsiusFromFahrenheit(temperature)).toBe(0);
  });
});

describe('feels like', () => {
  it('calculates heat index', () => {
    const temperature = 32;
    const relative_humidity = 85;

    expect(feelsLike(temperature, relative_humidity)).toBe(46);
  });

  it('calculates feels like for lower temperatures', () => {
    const temperature = 11;
    const relative_humidity = 79;

    expect(feelsLike(temperature, relative_humidity)).toBe(10);
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
