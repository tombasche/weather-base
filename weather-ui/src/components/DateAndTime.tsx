import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: absolute;
  top: 25px;
  right: 35px;
`;

const DateAndTime = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  const time = () => {
    const rawHours = date.getHours();
    const amPm = rawHours > 12 ? 'pm' : 'am';
    const amPmHours = rawHours % 12;

    const minutes = date.getMinutes();
    const leadingZero = minutes < 10 ? '0' : '';

    return (
      <span>
        {amPmHours}:{leadingZero}
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
