import styled from 'styled-components';
import DashboardImage from '../images/DashboardImage';

const Root = styled.div`
  position: absolute;
  bottom: 12px;
  right: 25px;
`;

const DashboardLink = () => {
  return (
    <Root>
      <a
        href={process.env.REACT_APP_GRAFANA_URL}
        target="_blank"
        rel="noreferrer"
      >
        <DashboardImage />
      </a>
    </Root>
  );
};

export default DashboardLink;
