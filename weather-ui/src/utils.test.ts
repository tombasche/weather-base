import { feelsLike, round, toCelsiusFromFahrenheit, toUnit } from './utils';

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
  it('calculate heat index', () => {
    const temperature = 32;
    const relative_humidity = 85;

    expect(feelsLike(temperature, relative_humidity)).toBe(46);
  });
});
