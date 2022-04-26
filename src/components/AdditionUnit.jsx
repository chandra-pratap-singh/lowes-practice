import React from "react";

const AdditionUnit = ({
  onInputChange,
  inputValue,
  onButtonClick,
  buttonLabel,
}) => {
  return (
    <>
      <div>
        <input onChange={onInputChange} value={inputValue} />
        <button onClick={onButtonClick}>{buttonLabel}</button>
      </div>
    </>
  );
};

export default AdditionUnit;
