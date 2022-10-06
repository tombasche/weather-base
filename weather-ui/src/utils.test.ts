import { round, to_unit } from './utils';

describe('rounding', () => {
  it('rounds a string to significant figure', () => {
    const temperature = '24.99234208324';
    expect(round(temperature)).toBe(25);
  });
});

describe('temperature conversion', () => {
  it('converts celsius to fahrenheit', () => {
    const temperature = 0;
    expect(to_unit(temperature, 'FAHRENHEIT')).toBe(32);
  });

  it('converts celsius to kelvin', () => {
    const temperature = 0;
    expect(to_unit(temperature, 'KELVIN')).toBe(273.15);
  });

  it('returns unchanged value celsius to celsius', () => {
    const temperature = 0;
    expect(to_unit(temperature, 'CELSIUS')).toBe(0);
  });
});