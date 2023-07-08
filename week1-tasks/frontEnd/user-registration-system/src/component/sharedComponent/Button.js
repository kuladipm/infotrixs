import React from "react";
const Button = ({ label, onClick }) => {
  return <button className="btn-block btn-myStyle" onClick={onClick}>{label}</button>;
};
 export default Button;