import clsx from "clsx";
import React, { useContext, useState } from "react";

import { OptionContext } from "../../../contexts/OptionContext";

import Styles from "./Styles.module.scss";

function Input({
  type = "text",
  placeholder,
  name,
  value,
  rule = "",
  onChange,
}) {
  const {
    optionState: { theme },
  } = useContext(OptionContext);

  const validateEmail = (email) => {
    let regexEmail;
    regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !!email.match(regexEmail);
  };
  const [status, setStatus] = useState("success");
  const checkValue = (e) => {
    if (name === "email") {
      if (!validateEmail(e.target.value)) {
        setStatus("error");
      }
    }
    if (rule.includes("required")) {
      if (e.target.value === "") {
        setStatus("error");
      }
    }
  };

  return (
    <input
      type={type}
      className={clsx(
        Styles.input,
        Styles[type],
        Styles[theme],
        Styles[status]
      )}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onBlur={checkValue}
      onFocus={() => setStatus("success")}
      onChange={onChange}
    />
  );
}

export default Input;
