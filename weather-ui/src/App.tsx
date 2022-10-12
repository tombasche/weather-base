import React from 'react';
import Temperature from './components/Temperature';
import { Settings, WeatherCondition } from './types';
import styled from 'styled-components';
import DateAndTime from './components/DateAndTime';
import Loading from './components/Loading';
import ErrorBanner from './components/ErrorBanner';
import useInterval from './api/useInterval';
import LastUpdated from './components/LastUpdated';
import NoData from './components/NoData';
import FeelsLike from './components/FeelsLike';
import Humidity from './components/Humidity';
import { round, timeOfDay } from './utils';
import TimeOfDay from './components/TimeOfDayIndicator';

type Props = {
  fetchMethod: () => Promise<WeatherCondition>;
};

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TemperatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25%;
`;

const TopBanner = styled.div`
  position: absolute;
  gap: 15px;
  top: 25px;
  left: 25px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row;
`;

const TIME_UPDATE_INTERVAL = 30_000; // 30 seconds
const DATA_REFRESH_INTERVAL = 10_000; // 10 seconds
const DEFAULT_TEMPERATURE_UNIT = 'CELSIUS';

const DEFAULT_SETTINGS: Settings = {
  temperatureUnit: DEFAULT_TEMPERATURE_UNIT,
  clockDisplay: '12H',
};

const App = ({ fetchMethod }: Props) => {
  const [data, setData] = React.useState<WeatherCondition>();
  const [error, setError] = React.useState<Error>();

  const [date, setDate] = React.useState<Date>(new Date());

  const [settings] = React.useState<Settings>(DEFAULT_SETTINGS);

  React.useEffect(() => {
    setInterval(() => setDate(new Date()), TIME_UPDATE_INTERVAL);
  }, []);

  // initial fetch
  React.useEffect(() => {
    fetchMethod()
      .then((response) => setData(response))
      .catch((e) => setError(e));
  }, [fetchMethod]);

  // Fetch every n milliseconds
  useInterval(async () => {
    fetchMethod()
      .then((response) => setData(response))
      .catch((e) => setError(e));
  }, DATA_REFRESH_INTERVAL);

  if (error !== undefined) {
    return <ErrorBanner error={error} />;
  }

  if (data === undefined) {
    return <Loading />;
  }

  if (data === null) {
    return <NoData />;
  }

  return (
    <Root>
      <TopBanner>
        <TimeOfDay timeOfDay={timeOfDay(date)} />
        <Humidity humidity={round(data.humidity_rh)} />
        <div>Air quality is good</div>
      </TopBanner>
      <TemperatureContainer>
        <Temperature
          temperature={data.temperature_c}
          unit={settings.temperatureUnit}
        />
        <FeelsLike data={data} />
      </TemperatureContainer>
      <DateAndTime now={date} displayFormat={settings.clockDisplay} />
      <LastUpdated timestamp={data.timestamp} />
    </Root>
  );
};

export default App;
