import React from 'react';
import Temperature from './components/Temperature';
import { AggregatedTemperature, WeatherCondition } from './types';
import styled from 'styled-components';
import Loading from './components/Loading';
import ErrorBanner from './components/ErrorBanner';
import useInterval from './api/useInterval';
import LastUpdated from './components/LastUpdated';
import FeelsLike from './components/FeelsLike';
import Humidity from './components/Humidity';
import { datesForAggregatedGraphFrom, timeOfDay } from './utils';
import TimeOfDay from './components/TimeOfDayIndicator';
import AirQuality from './components/AirQuality';
import { fetchAggregatedTemperature, fetchLatestData } from './api/httpCalls';
import { TemperatureChart } from './components/TemperatureChart';
import DashboardLink from './components/DashboardLink';

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
  gap: 10px;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 8%;
`;

const TemperatureAndFeelsLike = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopBanner = styled.div`
  position: absolute;
  gap: 15px;
  top: 25px;
  left: 25px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-flow: row;
`;

const TIME_UPDATE_INTERVAL = 30_000; // 30 seconds
const DATA_REFRESH_INTERVAL = 10_000; // 10 seconds
const AGGREGATED_DATA_REFRESH_INTERVAL = 120_000; // 2 minutes
const DEFAULT_TEMPERATURE_UNIT = 'CELSIUS';

const App = () => {
  const [data, setData] = React.useState<WeatherCondition>();
  const [error, setError] = React.useState<Error>();

  const [aggregatedTempData, setAggregatedTempData] = React.useState<
    AggregatedTemperature[]
  >([]);

  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    setInterval(() => setDate(new Date()), TIME_UPDATE_INTERVAL);
  }, []);

  // initial fetch
  React.useEffect(() => {
    fetchLatestData()
      .then((response) => setData(response))
      .catch((e) => setError(e));

    fetchAggregatedTemperature(...datesForAggregatedGraphFrom(new Date()))
      .then((response) => setAggregatedTempData(response))
      .catch((e) => setError(e));

    
  }, []);

  // Fetch every n milliseconds
  useInterval(async () => {
    fetchLatestData()
      .then((response) => setData(response))
      .catch((e) => setError(e));
  }, DATA_REFRESH_INTERVAL);

  // Fetch the aggregated data less often than the latest data
  useInterval(async () => {
    fetchAggregatedTemperature(...datesForAggregatedGraphFrom(new Date()))
      .then((response) => setAggregatedTempData(response))
      .catch((e) => setError(e));
  }, AGGREGATED_DATA_REFRESH_INTERVAL);

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
        <TemperatureAndFeelsLike>
          <Temperature
            temperature={data.temperature}
            unit={DEFAULT_TEMPERATURE_UNIT}
          />
          <FeelsLike feelsLike={data.feelsLike} />
        </TemperatureAndFeelsLike>
        <TemperatureChart data={aggregatedTempData} />
      </TemperatureContainer>
      <LastUpdated lastUpdate={data.timestamp} />
      <DashboardLink />
    </Root>
  );
};

export default App;
