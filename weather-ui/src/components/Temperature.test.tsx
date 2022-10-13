import { render, screen } from '@testing-library/react';
import Temperature from './Temperature';

describe('temperature', () => {
  it('celsius', () => {
    render(<Temperature temperature={26} unit="CELSIUS" />);

    const text = screen.getByText(/26/);
    expect(text.textContent).toBe('26°');
  });

  it('fahrenheit', () => {
    render(<Temperature temperature={0} unit="FAHRENHEIT" />);

    const text = screen.getByText(/32/);
    expect(text.textContent).toBe('32°F');
  });

  it('kelvin', () => {
    render(<Temperature temperature={0} unit="KELVIN" />);

    const text = screen.getByText(/273.15/);
    expect(text.textContent).toBe('273.15°K');
  });
});
