import { render, screen } from '@testing-library/react';
import TimeOfDay from './TimeOfDayIndicator';

describe('time of day', () => {
  it('morning', async () => {
    const timeOfDay = 'MORNING';

    render(<TimeOfDay timeOfDay={timeOfDay} />);

    const dayIcon = await screen.findByTitle('Morning');
    expect(dayIcon).toBeInTheDocument();
  });
  it('day', async () => {
    const timeOfDay = 'DAY';

    render(<TimeOfDay timeOfDay={timeOfDay} />);

    const dayIcon = await screen.findByTitle('Day');
    expect(dayIcon).toBeInTheDocument();
  });
  it('night', () => {});
});
