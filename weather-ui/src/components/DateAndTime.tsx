import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MOBILE_BREAKPOINT } from '../mobile';
import { ClockDisplay } from '../types';

type Props = {
  now: Date;
  displayFormat: ClockDisplay;
};

const Root = styled.div`
  position: absolute;
  top: 25px;
  right: 35px;
  font-size: 18px;
`;

const blinker = keyframes`
  50% {
    opacity: 0;
  }
`;

const BlinkingColon = styled.span`
  animation: ${blinker} 2s step-start infinite;
`;

const DateAndTime = ({ now, displayFormat }: Props) => {
  const amPm = (hours: number) => {
    if (hours === 0) return 'am';
    if (hours === 12) return 'pm';

    return hours > 12 ? 'pm' : 'am';
  };

  const hours12h = (hours: number) => {
    if (hours === 0) return 0;
    if (hours === 12) return 12;

    return hours % 12;
  };

  const time = () => {
    const hours = now.getHours();

    const minutes = now.getMinutes();
    const leadingZero = minutes < 10 ? '0' : '';

    return (
      <span>
        {hours12h(hours)}
        <BlinkingColon>:</BlinkingColon>
        {leadingZero}
        {minutes}
        {amPm(hours)}{' '}
      </span>
    );
  };

  const time24h = () => {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const leadingZero = minutes < 10 ? '0' : '';

    return (
      <span>
        {hours}
        <BlinkingColon>:</BlinkingColon>
        {leadingZero}
        {minutes}{' '}
      </span>
    );
  };

  const date = () => {
    return now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Root>
      {displayFormat === '12H' ? time() : time24h()}
      {date()}
    </Root>
  );
};

export default DateAndTime;
