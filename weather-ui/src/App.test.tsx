import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { WeatherCondition } from './types';

describe('main page', () => {
  const weatherCondition: WeatherCondition = {
    timestamp: '2022-09-27T16:57:58',
    altitude_m: '-79.2500991821289',
    pressure_pa: '100943.03125',
    temperature_c: '24.928709030151367',
    humidity_rh: '54.518096923828125',
    dew_point_c: '15.131230354309082',
    gas_resistance_ohms: '50009.390625',
  };

  it('displays temperature', async () => {
    const fetchMethod = jest.fn(() => Promise.resolve(weatherCondition));

    render(<App fetchMethod={fetchMethod} />);

    const temperature = await screen.findByText(/°/);

    expect(temperature.textContent).toBe('25°');

    expect(fetchMethod.mock.calls.length).toBe(1);
  });

  it('shows something to indicate it is loading', async () => {
    const fetchMethod = jest.fn(() => new Promise(() => weatherCondition));

    render(<App fetchMethod={fetchMethod} />);

    const loading = await screen.findByText(/Loading/);
    expect(loading).toBeInTheDocument();
  });

  it('shows an error message if loading fails', async () => {
    const fetchMethod = jest.fn(() =>
      Promise.reject({ message: 'An error occurred' }),
    );
    render(<App fetchMethod={fetchMethod} />);

    const error = await screen.findByText('An error occurred');
    expect(error).toBeInTheDocument();
  });

  it('opens the settings modal when icon is clicked', async () => {
    const fetchMethod = jest.fn(() => Promise.resolve(weatherCondition));

    render(<App fetchMethod={fetchMethod} />);

    const settingsIcon = await screen.findByTitle(/Settings icon/);
    fireEvent.click(settingsIcon);

    const settingsModal = await screen.findByText('Settings');
    expect(settingsModal).toBeInTheDocument();
  });
});
