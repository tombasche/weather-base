import { render, screen } from '@testing-library/react';
import LastUpdated from './LastUpdated';

describe('LastUpdated', () => {
  it('converts the utc timestamp to a readable string', () => {
    const timestamp = '2022-10-09T17:53:23Z';

    render(<LastUpdated timestamp={timestamp} />);

    const time = screen.getByText(/Last updated/);
    expect(time.textContent).toContain('8:53pm 9 Oct 2022');
  });

  it('does am correctly', () => {
    const timestamp = '2022-10-09T07:53:23Z';

    render(<LastUpdated timestamp={timestamp} />);

    const time = screen.getByText(/Last updated/);
    expect(time.textContent).toContain('10:53am 9 Oct 2022');
  });
});
