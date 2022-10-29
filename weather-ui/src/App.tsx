import React from 'react';
import Temperature from './components/Temperature';
import { Settings, WeatherCondition } from './types';
import styled from 'styled-components';
import DateAndTime from './components/DateAndTime';
import Loading from './components/Loading';
import ErrorBanner from './components/ErrorBanner';
import useInterval from './api/useInterval';
import LastUpdated from './components/LastUpdated';
import FeelsLike from './components/FeelsLike';
import Humidity from './components/Humidity';
import { timeOfDay } from './utils';
import TimeOfDay from './components/TimeOfDayIndicator';
import AirQuality from './components/AirQuality';
import { fetchLatestData } from './api/fetchLatestData';
import Chart from './components/Chart';

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

const App = () => {
  const [data, setData] = React.useState<WeatherCondition>();
  const [error, setError] = React.useState<Error>();

  const [aggregatedTempData, setAggregatedTempData] = React.useState<AggregatedTemperature[]>([])

  const [date, setDate] = React.useState<Date>(new Date());

  const [settings] = React.useState<Settings>(DEFAULT_SETTINGS);

  React.useEffect(() => {
    setInterval(() => setDate(new Date()), TIME_UPDATE_INTERVAL);
  }, []);

  // initial fetch
  React.useEffect(() => {
    fetchLatestData()
      .then((response) => setData(response))
      .catch((e) => setError(e));
  }, []);

  // Fetch every n milliseconds
  useInterval(async () => {
    fetchLatestData()
      .then((response) => setData(response))
      .catch((e) => setError(e));
  }, DATA_REFRESH_INTERVAL);

  if (error !== undefined) {
    return <ErrorBanner error={error} />;
  }

  if (data === undefined) {
    return <Loading />;
  }

  return (
    <Root>
      <TopBanner>
        <TimeOfDay timeOfDay={timeOfDay(date)} />
        <Humidity humidity={data.humidity} />
        <AirQuality iaq={data.iaq} />
      </TopBanner>
      <TemperatureContainer>
        <Temperature
          temperature={data.temperature}
          unit={settings.temperatureUnit}
        />
        <FeelsLike feelsLike={data.feelsLike} />
      </TemperatureContainer>
      <Chart title="Average temperature" values={[]} />
      <DateAndTime now={date} displayFormat={settings.clockDisplay} />
      <LastUpdated lastUpdate={data.timestamp} />
    </Root>
  );
};

export default App;
