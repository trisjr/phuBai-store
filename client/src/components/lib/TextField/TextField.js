import React, { useEffect, useState } from "react";
import clsx from "clsx";

import TextFieldStyles from "./TextFieldStyles.module.scss";
import checkTextField from "./helper";

export const TextFieldIcon = ({ children }) => {
  return <i className={TextFieldStyles.icon}>{children}</i>;
};

function TextField({
  type = "text",
  step,
  name = "textField",
  roles = "",
  title = "TextField",
  onBlur = () => {},
  onFocus = () => {},
  onClick = () => {},
  width = 320,
  value = "",
  status = true,
  autoComplete,
  children,
  onChange,
}) {
  const [statusState, setStatus] = useState(status);
  const [option, setOption] = useState({
    focus: value ? true : "",
    blur: "",
    label: "",
  });
  const { focus, blur, label } = option;

  useEffect(() => {
    setStatus(status);
  }, [status]);
  useEffect(() => {
    if (value) {
      setOption({
        focus: true,
        blur: "",
        label: true,
      });
    }
  }, [value]);

  const handleAction = (action, e) => {
    switch (action) {
      case "setStatusTrue": {
        setStatus(true);
        break;
      }
      case "setStatusFalse": {
        setStatus(false);
        break;
      }
      case "changeValue": {
        onChange(e.target.value);
        break;
      }
      case "onBlur": {
        checkValue();
        onBlur();
        if (!value) {
          setOption({
            ...option,
            focus: false,
            blur: true,
            label: false,
          });
        } else {
          setOption({
            ...option,
            label: false,
          });
        }

        break;
      }
      case "onFocus": {
        onFocus();
        setStatus(true);
        setOption({
          ...option,
          focus: true,
          blur: false,
          label: true,
        });
        break;
      }
      case "onClick": {
        onClick();
        break;
      }
      default:
        return;
    }
  };

  function checkValue() {
    if (status) {
      handleAction(
        checkTextField(roles, value) ? "setStatusTrue" : "setStatusFalse"
      );
    } else {
      handleAction("setStatusFalse");
    }
  }

  return (
    <div
      className={clsx(
        TextFieldStyles["TextField"],
        children && TextFieldStyles["withIcon"],
        !statusState && TextFieldStyles["error"]
      )}
      style={{ "--textField-width": `${width}px` }}
    >
      {children && <TextFieldIcon>{children}</TextFieldIcon>}
      <label
        htmlFor={name}
        className={clsx(
          TextFieldStyles.title,
          focus && TextFieldStyles["focus"],
          blur && TextFieldStyles["blur"],
          label && TextFieldStyles["label"]
        )}
      >
        {title}
      </label>
      <input
        className={TextFieldStyles.textField}
        id={name}
        type={type}
        step={step}
        value={value}
        autoComplete={autoComplete && `current-${name}`}
        onClick={() => handleAction("onClick")}
        onFocus={() => handleAction("onFocus")}
        onBlur={() => handleAction("onBlur")}
        onChange={(e) => handleAction("changeValue", e)}
      />
    </div>
  );
}

export default TextField;
