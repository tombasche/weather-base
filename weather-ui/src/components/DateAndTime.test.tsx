import { screen, render } from '@testing-library/react';
import DateAndTime from './DateAndTime';

describe('time rendering', () => {
  it('renders the time correctly', async () => {
    render(
      <DateAndTime now={new Date(2020, 0, 1, 11, 0, 0)} displayFormat="12H" />,
    );

    await screen.findByText(/1 Jan 2020/);
    await screen.findByText(/11/);
    await screen.findByText(/:/);
    await screen.findByText(/00/);
    await screen.findByText(/am/);
  });
});
