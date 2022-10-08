import React from 'react';
import styled, { keyframes } from 'styled-components';
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
  const time = () => {
    const hours = now.getHours();
    const amPm = hours > 12 ? 'pm' : 'am';

    const minutes = now.getMinutes();
    const leadingZero = minutes < 10 ? '0' : '';

    return (
      <span>
        {hours % 12}
        <BlinkingColon>:</BlinkingColon>
        {leadingZero}
        {minutes}
        {amPm}{' '}
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
