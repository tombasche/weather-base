import { round, to_unit } from './utils';

describe('rounding', () => {
  it('rounds a string to significant figure', () => {
    const temperature = '24.99234208324';
    expect(round(temperature)).toBe(25);
  });
});

describe('temperature conversion', () => {
  it('converts celsius to fahrenheiht', () => {
    const temperature = 0;
    expect(to_unit(temperature, 'FAHRENHEIT')).toBe(32);
  });
});
