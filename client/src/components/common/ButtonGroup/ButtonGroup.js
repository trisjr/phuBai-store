import React from "react";

import ButtonGroupStyles from "./ButtonGroupStyles.module.scss";
import clsx from "clsx";

export const ButtonItem = ({ children, onClick }) => {
  return (
    <div className={ButtonGroupStyles.buttonItem} onClick={onClick}>
      {children}
    </div>
  );
};

function ButtonGroup({ variant, color, children }) {
  return (
    <div
      className={clsx(
        ButtonGroupStyles.buttonGroup,
        ButtonGroupStyles[variant],
        ButtonGroupStyles[color]
      )}
    >
      {children}
    </div>
  );
}

export default ButtonGroup;
