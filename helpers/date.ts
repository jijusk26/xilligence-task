import moment from "moment";

export const formatDate = (date: string) => {
  return moment(date).format("MMM YYYY");
};

export const getYearDifference = (date: string) => {
  if (!date || !moment(date).isValid()) return 0;

  let diff = moment().diff(moment(date), "years");

  if (diff < 1) {
    return moment().diff(moment(date), "months") + " Months";
  }

  return diff + " Years";
};
