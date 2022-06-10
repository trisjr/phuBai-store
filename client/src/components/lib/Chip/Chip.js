import React from "react";

import ChipStyles from "./ChipStyles.module.scss";
import clsx from "clsx";

function Chip({
  variant = "contained",
  color = "primary",
  size = "medium",
  children,
  onClick = () => {},
}) {
  return (
    <div
      className={clsx(
        ChipStyles["chip"],
        ChipStyles[variant],
        ChipStyles[color],
        ChipStyles[size]
      )}
      onClick={() => onClick()}
    >
      {children}
    </div>
  );
}

export default Chip;
