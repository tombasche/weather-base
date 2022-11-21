import React from 'react';
import styled from 'styled-components';
import { MOBILE_BREAKPOINT } from '../mobile';

const Root = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    bottom: 15px;
  }
`;

type Props = {
  lastUpdate: Date;
};

const hours12h = (hours: number) => {
  if (hours === 0) return 0;
  if (hours === 12) return 12;

  return hours % 12;
};

const timestampToHumanReadable = (date: Date): string => {
  const amPm = date.getHours() >= 12 ? 'pm' : 'am';
  const minutes = date.getMinutes();
  const leadingZero = minutes < 10 ? '0' : '';
  const timeString = `${hours12h(
    date.getHours(),
  )}:${leadingZero}${minutes}${amPm}`;

  const datePortion = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return `${timeString} ${datePortion}`;
};

const tooMuchTimeElapsed = (lastUpdate: Date): boolean => {
  const now = new Date();
  const diff = (now.getTime() - lastUpdate.getTime()) / 1000;
  return diff > 180; // no updates in 3 minutes
};

const LastUpdated = ({ lastUpdate }: Props) => {
  return (
    <Root>
      Last updated {timestampToHumanReadable(lastUpdate)}{' '}
      {tooMuchTimeElapsed(lastUpdate) && '⚠️'}
    </Root>
  );
};

export default LastUpdated;
