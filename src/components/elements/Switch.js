import React from 'react';

const Switch = ({ isOn, handleToggle, onColor='#32c832', index=''}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new-${index}`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && onColor }}
        className="react-switch-label"
        htmlFor={`react-switch-new-${index}`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;