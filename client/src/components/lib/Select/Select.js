import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import SelectStyles from "./SelectStyles.module.scss";

import { MdOutlineArrowDropDown } from "react-icons/md";
import { useClickOutSide } from "../../../hooks/useClickOutSide";
import { checkSelect } from "./helper/helper";

function Select({
  array = [],
  selected = {
    value: "Click to choose",
  },
  title = "",
  status = true,
  width = 320,
  onSelect = () => {},
}) {
  const [option, setOption] = useState({
    open: "",
    focus: selected ? true : "",
    blur: "",
    label: "",
  });

  useEffect(() => {
    if (selected) {
      setOption({
        open: "",
        focus: true,
        blur: "",
        label: "",
      });
    }
  }, [selected]);

  const { open, focus, blur, label } = option;

  const [statusState, setStatusState] = useState(status);

  const handleAction = (action, value) => {
    switch (action) {
      case "setStatusTrue": {
        setStatusState(true);
        break;
      }
      case "setStatusFalse": {
        setStatusState(false);
        break;
      }
      case "onFocus": {
        setStatusState(true);
        setOption({
          ...option,
          open: true,
          focus: true,
          blur: false,
          label: true,
        });
        break;
      }
      case "onBlur": {
        if (!selected && !value) {
          setOption({
            ...option,
            open: false,
            focus: false,
            blur: true,
            label: false,
          });
        } else {
          setOption({
            ...option,
            open: false,
            label: false,
          });
        }
        break;
      }
      case "onClick": {
        if (open) {
          handleAction("onBlur");
        } else {
          handleAction("onFocus");
        }
        break;
      }
      case "onSelect": {
        onSelect(value);
        handleAction("onBlur", value);
        break;
      }
      default:
        return;
    }
  };

  useEffect(() => {
    setStatusState(status);
  }, [status]);

  const ref = useRef();

  useClickOutSide(ref, () => {
    if (open === true) {
      handleAction("onBlur");
    }
  });

  const ref3 = useRef();

  useEffect(() => {
    ref3.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [open]);

  return (
    <div
      ref={ref}
      className={clsx(
        SelectStyles["select"],
        statusState && SelectStyles["error"]
      )}
      style={{ "--width": `${width}px` }}
    >
      <div
        className={clsx(
          SelectStyles["title"],

          focus && SelectStyles["focus"],
          blur && SelectStyles["blur"],
          label && SelectStyles["label"]
        )}
      >
        {title}
      </div>
      <div
        className={clsx(SelectStyles["header"], open && SelectStyles["open"])}
        onClick={() => handleAction("onClick")}
      >
        <div className={SelectStyles["selected"]}>{selected["value"]}</div>
        <i className={SelectStyles["icon"]}>
          <MdOutlineArrowDropDown />
        </i>
      </div>
      {open && (
        <div className={clsx(SelectStyles["wrapper"])}>
          {array.map((item, index) => (
            <div
              ref={checkSelect(item, selected) ? ref3 : null}
              key={index}
              className={clsx(
                SelectStyles["item"],
                checkSelect(item, selected) && SelectStyles["selected"]
              )}
              onClick={(event) => handleAction("onSelect", item, event)}
            >
              {item.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
