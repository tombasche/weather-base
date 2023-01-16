import { render } from '@testing-library/react';
import Prediction from './Prediction';

describe('prediction', () => {
  it('doesnt appear if there is nothing to report', () => {
    render(<Prediction />);
  });

  it('shows snow over time if there is snow to report', () => {
    render(<Prediction />);
  });

  it('shows rain over time if there is rain to report', () => {
    render(<Prediction />);
  });
});
