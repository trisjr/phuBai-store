import React from "react";

import ToggleButtonStyles from "./ToggleButton.module.scss";
import clsx from "clsx";

export const ToggleButtonItem = ({ value, onChange, children }) => {
  return (
    <div
      className={clsx(
        ToggleButtonStyles["item"],
        value === children && ToggleButtonStyles["selected"]
      )}
      onClick={() => onChange(children)}
    >
      {children}
    </div>
  );
};

function ToggleButton({ variant, color, children }) {
  return (
    <div
      className={clsx(
        ToggleButtonStyles["toggleButton"],
        ToggleButtonStyles[variant],
        ToggleButtonStyles[color]
      )}
    >
      {children}
    </div>
  );
}

export default ToggleButton;
