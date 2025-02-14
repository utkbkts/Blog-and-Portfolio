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
    return "Şimdi";
  }

  if (time.search("minute") !== -1) {
    let mins = time.split(" ")[0];
    if (mins === "a") {
      return "1 dakika önce";
    } else {
      return `${mins} dakika`;
    }
  }

  if (time.search("hour") !== -1) {
    return dateByHourAndMin;
  }

  if (time === "a day") {
    return "Dün";
  }

  if (time === "a month") {
    return "Bir ay önce";
  }


  if (time.search("days") !== -1) {
    return getDay();
  }

  return time;
};

export const generateSlug = (input) => {
  if (typeof input !== "string") {
    return ""; // Handle invalid input
  }

  let result = input.split(" ").join("-");

  return result;
};
