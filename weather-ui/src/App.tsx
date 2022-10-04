import React from 'react';
import Temperature from './components/Temperature';
import { WeatherCondition } from './types';

type Props = {
  fetchMethod: () => Promise<WeatherCondition>;
};

const App = ({ fetchMethod }: Props) => {
  const [data, setData] = React.useState<WeatherCondition | undefined>();

  React.useEffect(() => {
    fetchMethod().then((response) => setData(response));
  }, []);

  return (
    <div>
      <Temperature temperature={data?.temperature_c} />
    </div>
  );
};

export default App;
