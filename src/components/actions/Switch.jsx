import React from "react";

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <div className="flex smallHeader pb-2 ">
        <input
          checked={isOn}
          onChange={handleToggle}
          className="react-switch-checkbox "
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
          style={{ background: isOn && "#06D6A0" }}
          className="react-switch-label"
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
        </label>
        <p className="mx-3 mt-1"> Sold </p>
      </div>
    </>
  );
};

export default Switch;
