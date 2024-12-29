import moment from "moment";

export const getDateLocal = (date) => {
  let now = moment();
  let momentDate = moment(date);
  let dateByHourAndMin = momentDate.format("HH:mm");
  let time = momentDate.fromNow(true);

  const getDay = () => {
    let days = time.split(" ")[0];

    if (Number(days) < 8) {
      return now.subtract(Number(days), "days").format("dddd");
    } else {
      return momentDate.format("DD/MM/YYYY");
    }
  };

  if (time === "a few seconds") {
    return "Now";
  }

  if (time.search("minute") !== -1) {
    let mins = time.split(" ")[0];
    if (mins === "a") {
      return "1 min";
    } else {
      return `${mins} min`;
    }
  }

  if (time.search("hour") !== -1) {
    return dateByHourAndMin;
  }

  if (time === "a day") {
    return "Yesterday";
  }

  if (time.search("days") !== -1) {
    return getDay();
  }

  return time;
};

export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};