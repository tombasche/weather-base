import React from 'react';
import Cog from '../images/Cog';
import styled from 'styled-components';
import Modal from './Modal';

const Root = styled.div`
  position: absolute;
  z-index: 1000;
  top: 25px;
  left: 18px;
`;
const Content = styled.div`
  padding: 15px;
`;

const SettingsButton = styled.span`
  cursor: pointer;
`;

const Settings = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  return (
    <Root>
      <SettingsButton onClick={() => setModalOpen(true)}>
        <Cog />
      </SettingsButton>
      <Modal
        title="Settings"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Content>
          TODO - 24 hour time, temperature in fahrenheit / kelvin
        </Content>
      </Modal>
    </Root>
  );
};

export default Settings;
