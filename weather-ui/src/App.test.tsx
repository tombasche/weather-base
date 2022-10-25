import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { mswServer } from './mocks/server';
import { rest } from 'msw';
import { LATEST_URL } from './api/endpoint';

describe('main page', () => {
  describe('latest data', () => {
    it('displays core information', async () => {
      render(<App />);

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
    });

    it('shows something to indicate it is loading', async () => {
      mswServer.use(
        rest.get(LATEST_URL, (req, res, ctx) => res(ctx.delay(100))),
      );

      render(<App />);

      const loading = await screen.findByText(/Loading/);
      expect(loading).toBeInTheDocument();
    });

    it('shows an error message if loading fails', async () => {
      mswServer.use(
        rest.get(LATEST_URL, (req, res, ctx) => res(ctx.status(404))),
      );
      render(<App />);

      const error = await screen.findByText(/Error/);
      expect(error).toBeInTheDocument();
    });
  });

  describe('aggregated data', () => {
    it('displays a chart with aggregated temperature', async () => {
      render(<App />);

      const chart = await screen.findByTitle(/Average temperature/);
      expect(chart).toBeInTheDocument();
    });
  });
});
