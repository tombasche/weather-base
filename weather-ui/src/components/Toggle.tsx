import React from 'react';

type Props = {
  toggled: boolean;
  onToggle: () => void;
};

const Toggle = ({ toggled, onToggle }: Props) => {
  return (
    <label>
      <input
        type="checkbox"
        role="switch"
        checked={toggled}
        onChange={onToggle}
      />
    </label>
  );
};

export default Toggle;
