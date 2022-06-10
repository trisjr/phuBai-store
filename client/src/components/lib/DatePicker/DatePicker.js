import clsx from "clsx";
import React, { useRef, useState } from "react";

import DatePickerStyles from "./DatePickerStyles.module.scss";

import { IoCalendarNumber, IoCaretBack, IoCaretForward } from "react-icons/io5";
import getDate, {
  CALENDAR_MONTHS,
  THIS_MONTH,
  THIS_YEAR,
  WEEK_DAYS,
  getNextMonth,
  getPreviousMonth,
  useDateFormat,
  isDate,
  isSameMonth,
  isSelectDate,
  isValidMinDate,
  isValidMaxDate,
  zeroPad,
} from "./calendar";

import { useClickOutSide } from "../../../hooks/useClickOutSide";
import { AiFillBackward, AiFillForward } from "react-icons/ai";

function DatePicker({ value, min, max, handleChange = () => {} }) {
  const [hidden, setHidden] = useState(true);
  const initDate = value
    ? {
        date: new Date(value).getUTCDate(),
        month: new Date(value).getUTCMonth() + 1,
        year: new Date(value).getUTCFullYear(),
      }
    : {
        date: 1,
        month: THIS_MONTH,
        year: THIS_YEAR,
      };
  const [dateState, setDateState] = useState(initDate);
  const { month, year } = dateState;

  const handleAction = (type, value) => {
    switch (type) {
      case "open": {
        setHidden(!hidden);
        break;
      }
      case "nextMonth": {
        let { nextMonth, nextYear } = getNextMonth(month, year);
        setDateState({
          ...dateState,
          month: nextMonth,
          year: nextYear,
        });
        break;
      }
      case "prevMonth": {
        let { prevMonth, prevYear } = getPreviousMonth(month, year);
        setDateState({
          ...dateState,
          month: prevMonth,
          year: prevYear,
        });
        break;
      }
      case "nextYear": {
        setDateState({
          ...dateState,
          year: year + 1,
        });
        break;
      }
      case "prevYear": {
        setDateState({
          ...dateState,
          year: year - 1,
        });
        break;
      }
      case "setDateToDay": {
        handleChange(
          `${zeroPad(THIS_YEAR, 4)}-${zeroPad(THIS_MONTH, 2)}-${zeroPad(
            new Date().getUTCDate(),
            2
          )}`
        );
        setDateState({
          ...dateState,
          year: THIS_YEAR,
          month: THIS_MONTH,
        });
        break;
      }
      case "setDate": {
        handleChange(`${value[0]}-${value[1]}-${value[2]}`);
        setDateState({
          ...dateState,
          year: value[0],
          month: parseInt(value[1]),
        });
        break;
      }
      case "close": {
        setHidden(true);
        setDateState(initDate);
        break;
      }
      default:
        return;
    }
  };

  const getDates = () => {
    return getDate(month, year).map((item, index) => ({
      ...item,
      week: Math.round(index / 7 + 0.5),
    }));
  };

  const getDatesWeeks = (week) => {
    return getDates().filter(function (item) {
      if (item.week === week) {
        return item;
      } else return null;
    });
  };

  const getWeeks = () => {
    return [
      getDatesWeeks(1),
      getDatesWeeks(2),
      getDatesWeeks(3),
      getDatesWeeks(4),
      getDatesWeeks(5),
      getDatesWeeks(6),
    ];
  };

  const ref = useRef();

  useClickOutSide(ref, () => {
    if (!hidden) {
      handleAction("close");
    }
  });

  return (
    <div className={DatePickerStyles.datePicker} ref={ref}>
      <div
        className={clsx(
          DatePickerStyles.content,
          !hidden ? DatePickerStyles.open : null
        )}
        onClick={() => handleAction("open")}
      >
        <div
          className={clsx(
            DatePickerStyles.dateValue,
            useDateFormat(value) === "-- / -- / ----"
              ? DatePickerStyles["placeholder"]
              : null
          )}
        >
          {useDateFormat(value)}
        </div>
        <i className={DatePickerStyles.icon}>
          <IoCalendarNumber className={DatePickerStyles.svg} />
        </i>
      </div>
      <div
        className={clsx(
          DatePickerStyles.wrapper,
          hidden ? DatePickerStyles.hidden : null
        )}
      >
        <div className={DatePickerStyles.head}>
          <div className={DatePickerStyles.action}>
            <i
              className={DatePickerStyles.icon}
              onClick={() => handleAction("prevYear")}
            >
              <AiFillBackward className={DatePickerStyles.svg} />
            </i>
            <i
              className={DatePickerStyles.icon}
              onClick={() => handleAction("prevMonth")}
            >
              <IoCaretBack className={DatePickerStyles.svg} />
            </i>
          </div>
          <div className={DatePickerStyles.monthAndYear}>
            {`${CALENDAR_MONTHS[month - 1]?.name}, ${year}`}
          </div>
          <div className={DatePickerStyles.action}>
            <i
              className={DatePickerStyles.icon}
              onClick={() => handleAction("nextMonth")}
            >
              <IoCaretForward className={DatePickerStyles.svg} />
            </i>
            <i
              className={DatePickerStyles.icon}
              onClick={() => handleAction("nextYear")}
            >
              <AiFillForward className={DatePickerStyles.svg} />
            </i>
          </div>
        </div>
        <div className={DatePickerStyles.body}>
          <div className={clsx(DatePickerStyles.days, DatePickerStyles.group)}>
            {WEEK_DAYS.map((item, index) => (
              <div
                className={clsx(DatePickerStyles.day, DatePickerStyles.col)}
                key={index}
              >
                {item.code}
              </div>
            ))}
          </div>
          <div className={DatePickerStyles.dates}>
            {getWeeks().map((week, index) => (
              <div
                key={index}
                className={clsx(DatePickerStyles.week, DatePickerStyles.group)}
              >
                {week.map((item, index) => (
                  <div
                    key={index}
                    className={clsx(
                      DatePickerStyles.date,
                      isSameMonth(item, month) &&
                        isValidMinDate(item, min) &&
                        isValidMaxDate(item, max)
                        ? DatePickerStyles.dateActive
                        : null,
                      isDate(item) ? DatePickerStyles.isDate : null,
                      isSelectDate(item, value)
                        ? DatePickerStyles.isSelected
                        : null,
                      DatePickerStyles.col
                    )}
                    onClick={() => {
                      if (
                        isValidMinDate(item, min) &&
                        isValidMaxDate(item, max)
                      ) {
                        handleAction("setDate", item);
                      }
                    }}
                  >
                    <div className={DatePickerStyles.text}>{item[2]}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            className={DatePickerStyles.action}
            onClick={() => handleAction("setDateToDay")}
          >
            Today
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
