import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  date: Date;
};

const Root = styled.div`
  position: absolute;
  top: 25px;
  right: 35px;
`;

const blinker = keyframes`
  50% {
    opacity: 0;
  }
`;

const BlinkingColon = styled.span`
  animation: ${blinker} 2s step-start infinite;
`;

const DateAndTime = ({ date }: Props) => {
  const time = () => {
    const rawHours = date.getHours();
    const amPm = rawHours > 12 ? 'pm' : 'am';
    const amPmHours = rawHours % 12;

    const minutes = date.getMinutes();
    const leadingZero = minutes < 10 ? '0' : '';

    return (
      <span>
        {amPmHours}
        <BlinkingColon>:</BlinkingColon>
        {leadingZero}
        {minutes} {amPm}{' '}
      </span>
    );
  };

  return (
    <Root>
      {time()}
      {date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })}
    </Root>
  );
};

export default DateAndTime;
