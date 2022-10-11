import { render, screen } from '@testing-library/react';
import Temperature from './Temperature';

describe('temperature', () => {
  it('celsius', async () => {
    render(<Temperature temperature="26" unit="CELSIUS" />);

    const text = await screen.getByText(/26/);
    expect(text.textContent).toBe('26°');
  });

  it('fahrenheit', async () => {
    render(<Temperature temperature="0" unit="FAHRENHEIT" />);

    const text = await screen.getByText(/32/);
    expect(text.textContent).toBe('32°F');
  });

  it('kelvin', async () => {
    render(<Temperature temperature="0" unit="KELVIN" />);

    const text = await screen.getByText(/273.15/);
    expect(text.textContent).toBe('273.15°K');
  });
});
