import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

import ButtonStyles from "./ButtonStyles.module.scss";

const LinkTo = ({ href, children }) => {
  return <Link to={href}>{children}</Link>;
};

function Button({
  variant = "contained",
  type = "button",
  size = "medium",
  color = "primary",
  startIcon,
  endIcon,
  href,
  children = "Button",
  onClick = () => {},
}) {
  if (href) {
    return (
      <LinkTo href={href}>
        <button
          className={clsx(
            ButtonStyles["button"],
            ButtonStyles[variant],
            ButtonStyles[color],
            ButtonStyles[size]
          )}
          type={type}
          onClick={onClick}
        >
          <div className={ButtonStyles["content"]}>
            {startIcon ? (
              <div className={ButtonStyles["icon"]}>{startIcon}</div>
            ) : null}
            <div className={ButtonStyles["text"]}>{children}</div>
            {endIcon ? (
              <div className={ButtonStyles["icon"]}>{endIcon}</div>
            ) : null}
          </div>
        </button>
      </LinkTo>
    );
  }
  return (
    <button
      className={clsx(
        ButtonStyles["button"],
        ButtonStyles[variant],
        ButtonStyles[color],
        ButtonStyles[size]
      )}
      type={type}
      onClick={onClick}
    >
      <div className={ButtonStyles["content"]}>
        {startIcon ? (
          <div className={ButtonStyles["icon"]}>{startIcon}</div>
        ) : null}
        <div className={ButtonStyles["text"]}>{children}</div>
        {endIcon ? <div className={ButtonStyles["icon"]}>{endIcon}</div> : null}
      </div>
    </button>
  );
}

export default Button;
