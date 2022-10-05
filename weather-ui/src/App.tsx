import React from 'react';
import Temperature from './components/Temperature';
import { WeatherCondition } from './types';

type Props = {
  fetchMethod: () => Promise<WeatherCondition>;
};

const App = ({ fetchMethod }: Props) => {
  const [data, setData] = React.useState<WeatherCondition>();
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    fetchMethod()
      .then((response) => setData(response))
      .catch((e) => setError(e.message));
  }, [fetchMethod]);

  if (error !== undefined) {
    return <div>{error}</div>;
  }

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Temperature temperature={data.temperature_c} />
    </div>
  );
};

export default App;
