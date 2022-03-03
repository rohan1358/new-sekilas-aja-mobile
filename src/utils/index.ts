import { PixelRatio } from "react-native";

const pixelRatio = PixelRatio.get();

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

console.log("pixelRatio", pixelRatio);

const adjust = (size?: any) => {
  if (size >= 5) {
    if (pixelRatio <= 1.5) {
      return size - 4;
    } else if (pixelRatio <= 2) {
      return size - 2;
    } else {
      return size;
    }
  } else {
    return size;
  }
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

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const openRate = false;
export {
  padTo2Digits,
  formatDate,
  openRate,
  checkData,
  validateEmail,
  adjust,
  getRandomInt
};
