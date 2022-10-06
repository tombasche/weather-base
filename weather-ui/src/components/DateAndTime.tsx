import React from 'react';
import styled, { keyframes } from 'styled-components';

type Props = {
  now: Date;
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

const DateAndTime = ({ now }: Props) => {
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
        {minutes} {amPm}{' '}
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
      {time()}
      {date()}
    </Root>
  );
};

export default DateAndTime;
