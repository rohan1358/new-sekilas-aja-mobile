const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

const formatDate = (date: Date, format: any) => {
  if (format === "d-m-y") {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear()
    ].join("-");
  } else {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate())
    ].join("-");
  }
};

const checkData = (param: any) => {
  if (param) {
    return true;
  } else {
    return false;
  }
};

const validateEmail = (emailAdress: any) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
};

const openRate = false;
export { padTo2Digits, formatDate, openRate, checkData, validateEmail };
