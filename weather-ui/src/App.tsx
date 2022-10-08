import React from 'react';
import Temperature from './components/Temperature';
import { TemperatureUnit, WeatherCondition } from './types';
import styled from 'styled-components';
import DateAndTime from './components/DateAndTime';
import Settings from './components/Settings';
import Loading from './components/Loading';
import ErrorBanner from './components/ErrorBanner';

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

const TIME_UPDATE_INTERVAL = 30_000; // 30 seconds
const DEFAULT_TEMPERATURE_UNIT = 'CELSIUS';

const App = ({ fetchMethod }: Props) => {
  const [data, setData] = React.useState<WeatherCondition>();
  const [error, setError] = React.useState<Error>();

  const [date, setDate] = React.useState<Date>(new Date());

  const [unit] = React.useState<TemperatureUnit>(DEFAULT_TEMPERATURE_UNIT);

  React.useEffect(() => {
    setInterval(() => setDate(new Date()), TIME_UPDATE_INTERVAL);
  }, []);

  React.useEffect(() => {
    fetchMethod()
      .then((response) => setData(response))
      .catch((e) => {
        setError(e);
      });
  }, [fetchMethod]);

  if (error !== undefined) {
    return <ErrorBanner error={error} />;
  }

  if (data === undefined) {
    return <Loading />;
  }

  return (
    <Root>
      <Settings updateSettings={() => console.log('nothing to see here')} />
      <TemperatureContainer>
        <Temperature temperature={data.temperature_c} unit={unit} />
      </TemperatureContainer>
      <DateAndTime now={date} />
    </Root>
  );
};

export default App;
