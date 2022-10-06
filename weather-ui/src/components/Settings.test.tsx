import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Settings from './Settings';

describe('settings', () => {
  it('informs the parent when a setting is changed', async () => {
    const updateSettings = jest.fn();

    render(<Settings updateSettings={updateSettings} />);
    fireEvent.click(await screen.findByTitle('Settings icon'));

    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Fahrenheit (F)' }),
    );

    expect(updateSettings.mock.calls.length).toBe(1);
  });
});
