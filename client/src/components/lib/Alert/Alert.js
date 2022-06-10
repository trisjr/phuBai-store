import React from "react";
import clsx from "clsx";

import AlertStyles from "./AlertStyles.module.scss";

import {
  MdClose,
  MdDone,
  MdErrorOutline,
  MdOutlineWarningAmber,
} from "react-icons/md";

import { ImInfo } from "react-icons/im";

const icon = {
  error: <MdErrorOutline />,
  warning: <MdOutlineWarningAmber />,
  info: <ImInfo />,
  success: <MdDone />,
};

function Alert({
  title = "Alert",
  status = "info",
  children = "This is a alert!",
  pos = "right_bottom",
  onClick = () => {},
}) {
  return (
    <div
      className={clsx(
        AlertStyles["alert"],
        AlertStyles[status],
        AlertStyles[pos],
        AlertStyles["show"]
      )}
      onClick={onClick}
    >
      <i className={AlertStyles["icon"]}>{icon[status]}</i>
      <div className={AlertStyles["content"]}>
        <div className={AlertStyles["title"]}>{title}</div>
        <div className={AlertStyles["text"]}>{children}</div>
      </div>
      <i className={clsx(AlertStyles["action"], AlertStyles["icon"])}>
        <MdClose />
      </i>
    </div>
  );
}
export default Alert;
