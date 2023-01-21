import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { mswServer } from './mocks/server';
import { rest } from 'msw';
import { LATEST_URL } from './api/endpoint';

describe('main page', () => {
  describe('latest data', () => {
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
});
