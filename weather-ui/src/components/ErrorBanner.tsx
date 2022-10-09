import React from 'react';
import styled from 'styled-components';

type Props = {
  error: Error;
};

const Root = styled.div`
  position: absolute;
  left: 40%;
  top: 25%;

  display: flex;
`;

const Banner = styled.div`
  padding: 12px 25px;

  border: 1px solid red;
  border-left: 4px solid red;
  border-radius: 4px;

  background: rgba(255, 0, 0, 0.2);
`;

const ErrorBanner = ({ error }: Props) => {
  return (
    <Root>
      <Banner>
        <h4>{error.message}</h4>
        <p>{error.toString()}</p>
      </Banner>
    </Root>
  );
};

export default ErrorBanner;
