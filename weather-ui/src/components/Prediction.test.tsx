import { render, screen } from '@testing-library/react';
import { PredictionApi } from '../types';
import Prediction from './Prediction';

describe('prediction', () => {
  const basePrediction: PredictionApi = {
    rain: {
      amount: 0.0,
      over: {
        time: 3,
        unit: 'hours',
      },
      at: '2023-01-05 04:00:00.000',
    },
    snow: {
      amount: 0.0,
      over: {
        time: 3,
        unit: 'hours',
      },
      at: '2023-01-05 04:00:00.000',
    },
  };

  it('doesnt render a message if there is nothing to report', () => {
    const predictionResponse: PredictionApi = {
      ...basePrediction,
      rain: {
        ...basePrediction.rain,
        amount: 0.0,
      },
      snow: {
        ...basePrediction.snow,
        amount: 0.0,
      },
    };
    render(<Prediction prediction={predictionResponse} />);

    const snowText = screen.queryByText(/❄️/);
    const rainText = screen.queryByText(/🌧️/);

    expect(snowText).not.toBeInTheDocument();
    expect(rainText).not.toBeInTheDocument();
  });

  it('shows snow over time if there is snow to report', () => {
    const predictionResponse: PredictionApi = {
      ...basePrediction,
      rain: {
        ...basePrediction.rain,
        amount: 0.0,
      },
      snow: {
        ...basePrediction.snow,
        amount: 1.0,
      },
    };
    render(<Prediction prediction={predictionResponse} />);

    const snowText = screen.queryByText(/❄️/);
    const rainText = screen.queryByText(/🌧️/);

    expect(snowText).toBeInTheDocument();
    expect(rainText).not.toBeInTheDocument();
  });

  it('shows rain over time if there is rain to report', () => {
    const predictionResponse: PredictionApi = {
      ...basePrediction,
      rain: {
        ...basePrediction.rain,
        amount: 1.0,
      },
      snow: {
        ...basePrediction.snow,
        amount: 0.0,
      },
    };
    render(<Prediction prediction={predictionResponse} />);

    const snowText = screen.queryByText(/❄️/);
    const rainText = screen.queryByText(/🌧️/);

    expect(snowText).not.toBeInTheDocument();
    expect(rainText).toBeInTheDocument();
  });
});
