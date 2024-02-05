import moment from "moment";

export const formatDate = (inputDate: string): string => {
  const parsedDate = moment(inputDate);
  const formattedDate = parsedDate.format("MMMM D, YYYY [at] hh:mm A");

  return formattedDate;
};
