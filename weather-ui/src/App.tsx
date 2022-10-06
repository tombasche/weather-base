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

  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

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
      <DateAndTime date={date} />
    </Root>
  );
};

export default App;
