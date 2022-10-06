import React from 'react';
import Cog from '../images/Cog';
import styled from 'styled-components';
import Modal from './Modal';
import Toggle from './Toggle';

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

type Props = {
  updateSettings: () => void;
};

const Settings = ({ updateSettings }: Props) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [isToggled, setIsToggled] = React.useState<boolean>(false);

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
          <div>
            <select
              data-testid="temperature-unit-select"
              onChange={() => updateSettings()}
            >
              <option value="CELSIUS">Celsius</option>
              <option value="FAHRENHEIT">Fahrenheit (F)</option>
              <option value="KELVIN">Kelvin (K)</option>
            </select>
            Temperature unit
          </div>
          <div>
            <Toggle
              toggled={isToggled}
              onToggle={() => setIsToggled(!isToggled)}
            />
            Use 12-hour time
          </div>
        </Content>
      </Modal>
    </Root>
  );
};

export default Settings;
