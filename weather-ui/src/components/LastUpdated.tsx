import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
`;

type Props = {
  timestamp: string;
};

const LastUpdated = ({ timestamp }: Props) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const amPm = hours >= 12 ? 'pm' : 'am';
  const minutes = date.getMinutes();
  const leadingZero = minutes < 10 ? '0' : '';
  const timeString = `${hours % 12}:${leadingZero}${minutes}${amPm}`;

  const datePortion = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Root>
      Last updated {timeString} {datePortion}
    </Root>
  );
};

export default LastUpdated;
