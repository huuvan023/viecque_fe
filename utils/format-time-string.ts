export const convertDateTimeToString = (val: any) => {
  if (!val) return "NULL";
  let date = new Date(val);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  if (date.toString() === "Invalid Date") return "NULL";
  return `${date.toISOString()}`;
};

export const convertDateTimeToDateString = (val: any) => {
  if (!val) return "NULL";
  let date = new Date(val);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  if (date.toString() === "Invalid Date") return "NULL";
  return `${date.toISOString().substring(0, 10)}`;
};
