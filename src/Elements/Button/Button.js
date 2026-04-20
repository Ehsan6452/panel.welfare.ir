import React from "react";
import "./Button.css";

function Button({
  children,
  onClick,
  type = "button",
  variant = "default",
  disabled = false,
  className = "",
}) {

  const classes = `btn btn-${variant} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}

export default Button;
