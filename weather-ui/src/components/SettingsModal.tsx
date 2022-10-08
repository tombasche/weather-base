import React from 'react';
import Cog from '../images/Cog';
import styled from 'styled-components';
import Modal from './Modal';
import { Settings, TemperatureUnit } from '../types';

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
  currentSettings: Settings;
  onUpdate: (s: Settings) => void;
};

const SettingsModal = ({ currentSettings, onUpdate }: Props) => {
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
          <div>
            <select
              data-testid="temperature-unit-select"
              value={currentSettings.temperatureUnit}
              onChange={(e) =>
                onUpdate({
                  ...currentSettings,
                  temperatureUnit: e.target.value as TemperatureUnit,
                })
              }
            >
              <option value="CELSIUS">Celsius</option>
              <option value="FAHRENHEIT">Fahrenheit (F)</option>
              <option value="KELVIN">Kelvin (K)</option>
            </select>
            Temperature unit
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                role="switch"
                checked={currentSettings.clockDisplay === '12H'}
                onChange={(e) =>
                  onUpdate({
                    ...currentSettings,
                    clockDisplay:
                      currentSettings.clockDisplay === '12H' ? '24H' : '12H',
                  })
                }
              />
            </label>
            Use 12-hour time
          </div>
        </Content>
      </Modal>
    </Root>
  );
};

export default SettingsModal;
