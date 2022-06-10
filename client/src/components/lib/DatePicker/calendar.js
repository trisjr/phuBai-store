export const THIS_YEAR = new Date().getUTCFullYear();
export const THIS_MONTH = new Date().getUTCMonth() + 1;
export const CALENDAR_WEEKS = 6;

export const WEEK_DAYS = [
  {
    code: "Sun",
    name: "Sunday",
  },
  {
    code: "Mon",
    name: "Monday",
  },
  {
    code: "Tue",
    name: "Tuesday",
  },
  {
    code: "Wed",
    name: "Wednesday",
  },
  {
    code: "Thu",
    name: "Thursday",
  },
  {
    code: "Fri",
    name: "Friday",
  },
  {
    code: "Sat",
    name: "Saturday",
  },
];

export const CALENDAR_MONTHS = [
  {
    code: "Jan",
    name: "January",
  },
  {
    code: "Feb",
    name: "February",
  },
  {
    code: "Mar",
    name: "March",
  },
  {
    code: "Apr",
    name: "April",
  },
  {
    code: "May",
    name: "May",
  },
  {
    code: "Jun",
    name: "June",
  },
  {
    code: "Jul",
    name: "July",
  },
  {
    code: "Aug",
    name: "August",
  },
  {
    code: "Sep",
    name: "September",
  },
  {
    code: "Oct",
    name: "October",
  },
  {
    code: "Nov",
    name: "November",
  },
  {
    code: "Dec",
    name: "December",
  },
];

export const useDateFormat = (value) => {
  let date = new Date(value);
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();

  return value
    ? `${zeroPad(day, 2)} / ${zeroPad(month, 2)} / ${year}`
    : "-- / -- / ----";
};

export const zeroPad = (value, length) => {
  return `${value}`.padStart(length, "0");
};

export const isDate = (date) => {
  let time = new Date();
  return (
    date[0] === time.getUTCFullYear() &&
    date[1] === zeroPad(time.getUTCMonth() + 1, 2) &&
    date[2] === zeroPad(time.getUTCDate(), 2)
  );
};

export const isSelectDate = (date, value) => {
  let time = new Date(value);
  return (
    date[0] === time.getUTCFullYear() &&
    date[1] === zeroPad(time.getUTCMonth() + 1, 2) &&
    date[2] === zeroPad(time.getUTCDate(), 2)
  );
};

export const isSameMonth = (date, month) => {
  return date[1] === zeroPad(month, 2);
};

export const isValidMinDate = (date, min) => {
  if (typeof min === "object") {
    return (
      new Date(`${date[0]}-${date[1]}-${date[2]}`).getTime() >=
      new Date(
        `${min.getUTCFullYear()}-${min.getUTCMonth() + 1}-${min.getUTCDate()}`
      ).getTime()
    );
  }
  if (!min) {
    return true;
  }
  return (
    new Date(`${date[0]}-${date[1]}-${date[2]}`).getTime() >=
    new Date(min).getTime()
  );
};

export const isValidMaxDate = (date, max) => {
  if (typeof max === "object") {
    return (
      new Date(`${date[0]}-${date[1]}-${date[2]}`).getTime() <=
      new Date(
        `${max.getFullYear()}-${zeroPad(max.getMonth() + 1, 2)}-${zeroPad(
          max.getDate(),
          2
        )}`
      ).getTime()
    );
  }
  if (!max) {
    return true;
  }
  let time = new Date(max);
  return (
    new Date(`${date[0]}-${date[1]}-${date[2]}`).getTime() <=
    new Date(
      `${time.getFullYear()}-${zeroPad(time.getMonth() + 1, 2)}-${zeroPad(
        time.getDate(),
        2
      )}`
    ).getTime()
  );
};

export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;
  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
};

export const getPreviousMonth = (month, year) => {
  const prevMonth = month > 1 ? month - 1 : 12;
  const prevMonthYear = month > 1 ? year : year - 1;
  return { prevMonth, prevYear: prevMonthYear };
};

export const getNextMonth = (month, year) => {
  const nextMonth = month < 12 ? month + 1 : 1;
  const nextMonthYear = month < 12 ? year : year + 1;
  return { nextMonth, nextYear: nextMonthYear };
};

export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;
};

export default function getDate(month = THIS_MONTH, year = THIS_YEAR) {
  const monthDays = getMonthDays(month, year);
  const monthFirstDay = getMonthFirstDay(month, year);

  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  const { prevMonth, prevYear } = getPreviousMonth(month, year);
  const { nextMonth, nextYear } = getNextMonth(month, year);

  const prevMonthDays = getMonthDays(prevMonth, prevYear);

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return [prevYear, zeroPad(prevMonth, 2), zeroPad(day, 2)];
  });

  const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month, 2), zeroPad(day, 2)];
  });

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return [nextYear, zeroPad(nextMonth, 2), zeroPad(day, 2)];
  });

  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
}
