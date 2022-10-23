import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { WeatherCondition, WeatherConditionApi } from './types';

describe('main page', () => {
  const weatherCondition: WeatherCondition = {
    timestamp: new Date(),
    temperature: 25,
    feelsLike: 22,
    humidity: 54,
    iaq: 12,
  };

  it('displays core information', async () => {
    const fetchMethod = jest.fn(() => Promise.resolve(weatherCondition));

    render(<App fetchMethod={fetchMethod} />);

    const temperature = await screen.findByText(/25°/);
    expect(temperature).toBeInTheDocument();

    const lastUpdated = await screen.findByText(/Last updated/);
    expect(lastUpdated).toBeInTheDocument();

    const feelsLike = await screen.findByText(/Feels like/);
    expect(feelsLike).toBeInTheDocument();

    const humidity = await screen.findByText(/%/);
    expect(humidity).toBeInTheDocument();

    const airQuality = await screen.findByText(/Air quality/);
    expect(airQuality).toBeInTheDocument();

    expect(fetchMethod.mock.calls.length).toBe(1);
  });

  it('shows something to indicate it is loading', async () => {
    const fetchMethod = jest.fn(() => new Promise(() => weatherCondition));

    // @ts-ignore
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

  it('shows something if the response is null', async () => {
    const fetchMethod = jest.fn(() => Promise.resolve(null));

    // @ts-ignore
    render(<App fetchMethod={fetchMethod} />);

    const error = await screen.findByText(
      /There doesn't appear to be any data :\(/,
    );
    expect(error).toBeInTheDocument();
  });
});
