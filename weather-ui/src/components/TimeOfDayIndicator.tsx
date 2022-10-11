import React from 'react';
import DayImage from '../images/DayImage';
import MorningImage from '../images/MorningImage';
import NightImage from '../images/NightImage';
import { TimeOfDay } from '../types';

type Props = {
  timeOfDay: TimeOfDay;
};

const pickIcon = (timeOfDay: TimeOfDay) => {
  switch (timeOfDay) {
    case 'MORNING':
      return <MorningImage />;
    case 'DAY':
      return <DayImage />;
    case 'NIGHT':
      return <NightImage />;
  }
};

const TimeOfDayIndicator = ({ timeOfDay }: Props) => {
  return <div>{pickIcon(timeOfDay)}</div>;
};

export default TimeOfDayIndicator;
