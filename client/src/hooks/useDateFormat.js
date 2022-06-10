export function useDateFormat(value) {
  let date = new Date(value);
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();

  return value
    ? `${day < 10 ? "0" + day : day} / ${
        month < 10 ? "0" + month : month
      } / ${year}`
    : "-- / -- / ----";
}
