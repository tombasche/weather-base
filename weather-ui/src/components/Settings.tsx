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

const Settings = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  return (
    <Root>
      <span onClick={() => setModalOpen(true)}>
        <Cog />
      </span>

      {modalOpen && (
        <>
          <Modal
            title="Settings"
            isOpen={modalOpen}
            close={() => setModalOpen(false)}
          >
            <Content>here be stuff</Content>
          </Modal>
        </>
      )}
    </Root>
  );
};

export default Settings;
