import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Settings } from '../types';
import SettingsModal from './SettingsModal';

describe('settings', () => {
  const defaultSettings: Settings = {
    temperatureUnit: 'CELSIUS',
    clockDisplay: '12H',
  };

  it('informs the parent when a setting is changed', async () => {
    const updateSettings = jest.fn();

    render(
      <SettingsModal
        currentSettings={defaultSettings}
        onUpdate={updateSettings}
      />,
    );
    fireEvent.click(await screen.findByTitle('Settings icon'));

    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'Fahrenheit (F)' }),
    );

    expect(updateSettings.mock.calls.length).toBe(1);
    expect(updateSettings.mock.calls[0]).toEqual([
      {
        temperatureUnit: 'FAHRENHEIT',
        clockDisplay: '12H',
      },
    ]);
  });
});
