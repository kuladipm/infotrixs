import React from "react";
const FormInput = ({ type, label, name, value, onChange }) => {
  console.log(value)
  return (
    <div className="mb-3">
      <label className="form-label">{label}<span className="star-mark">*</span></label>
      <input className="form-control" type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
};
export default FormInput;

