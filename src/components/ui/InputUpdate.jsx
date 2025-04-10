import React from "react";

function InputUpdate({ value, className, onClick, disabled }) {
  return (
    <button
      className={`flex justify-center text-[#426f51] items-center h-14 bg-[#426f5123] ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(value);
      }}
      value={value}
      disabled={disabled}
    >
      <div>{value}</div>
    </button>
  );
}

export default InputUpdate;
