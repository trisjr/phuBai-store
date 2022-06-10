import React from "react";
import clsx from "clsx";

import Styles from "./Styles.module.scss";

function Button({
  children,
  variant = "contained",
  styles,
  color = "primary",
  size,
  type = "button",
  startIcon,
  endIcon,
  onClick = () => {},
}) {
  return (
    <button
      className={clsx(
        Styles.button,
        Styles[variant],
        Styles[styles],
        Styles[color],
        Styles[size]
      )}
      type={type}
      onClick={onClick}
    >
      <div className={Styles.content}>
        {startIcon ? <i className={Styles.icon}>{startIcon}</i> : null}
        {children}
        {endIcon ? <i className={Styles.icon}>{endIcon}</i> : null}
      </div>
    </button>
  );
}

export default Button;
