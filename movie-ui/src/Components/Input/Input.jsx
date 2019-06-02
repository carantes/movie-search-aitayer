import React from "react";

const Input = ({ type, placeholder, onChange, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    className={className}
  />
);

export default Input;
