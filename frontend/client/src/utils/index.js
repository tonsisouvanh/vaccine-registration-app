import { format } from "date-fns";

export const numberFormat = (value) =>
  new Intl.NumberFormat({
    currency: "VND",
  }).format(value);

export const dateFormat = (value) => {
  var fields = value.split("T");
  const date = new Date(fields[0]);

  return format(date, "dd-MM-yyyy");
};
