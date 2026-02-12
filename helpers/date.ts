import moment from "moment";

export const formatDate = (date: string) => {
  return moment(date).format("MMM YYYY");
};

export const transformDate = (date?: string) => {
  if (!date || !moment(date).isValid()) return "Nil";

  return moment(date, "YYYY-MM-DD").format("D MMM, YYYY");
};

export const getYearDifference = (date: string) => {
  if (!date || !moment(date).isValid()) return 0;

  let diff = moment().diff(moment(date), "years");

  if (diff < 1) {
    return moment().diff(moment(date), "months") + " Months";
  }

  return diff + " Years";
};
