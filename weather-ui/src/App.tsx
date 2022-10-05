import React from 'react';
import Temperature from './components/Temperature';
import { WeatherCondition } from './types';
import styled from 'styled-components';
import DateAndTime from './components/DateAndTime';

type Props = {
  fetchMethod: () => Promise<WeatherCondition>;
};

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TemperatureContainer = styled.div`
  position: absolute;
  top: 25%;
`;

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
    <Root>
      <TemperatureContainer>
        <Temperature temperature={data.temperature_c} />
      </TemperatureContainer>
      <DateAndTime />
    </Root>
  );
};

export default App;
