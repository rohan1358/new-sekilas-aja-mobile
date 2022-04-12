import { PixelRatio, Dimensions, Appearance } from "react-native";
import CryptoJS from "crypto-es";
import RNRestart from "react-native-restart";

const pixelRatio = PixelRatio.get();

// const { width, height } = Dimensions.get("window");

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

const adjust = (size?: any) => {
  const calculate = (param: any) => {
    if (size > 60) {
      return param * 3;
    } else if (size > 50) {
      return param * 2;
    } else {
      return param;
    }
  };

  if (size >= 5) {
    if (pixelRatio <= 1.2) {
      return size - calculate(15);
    }
    // 1.4
    else if (pixelRatio <= 1.4) {
      return size - calculate(13);
    }
    // 1.8
    else if (pixelRatio <= 1.8) {
      return size - calculate(11);
    }
    // 2
    else if (pixelRatio <= 2) {
      return size - calculate(9);
    }
    // 2.2
    else if (pixelRatio <= 2.2) {
      return size - calculate(7);
    }
    // 2.4
    else if (pixelRatio <= 2.4) {
      return size - calculate(5);
    }
    // 2.6
    else if (pixelRatio <= 2.6) {
      return size - calculate(3);
    }
    // 2.7
    else if (pixelRatio <= 2.7) {
      return size - calculate(2.5);
    }
    // 2.8
    else if (pixelRatio <= 2.8) {
      return size - calculate(2);
    } else {
      return size;
    }
  } else {
    return size;
  }
};

const adjustLetterSpace = (size?: any) => {
  if (size >= 5) {
    if (pixelRatio <= 1.5) {
      return size + 0.4;
    } else if (pixelRatio <= 2) {
      return size + 0.2;
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
  if (!emailAdress.includes("com")) {
    return false;
  } else if (emailAdress.match(regexEmail) || !emailAdress.includes("com")) {
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

const encrypt = (pw: string) => {
  var encrypted = CryptoJS.AES.encrypt(pw, "p@sw0rd");
  return encrypted.toString();
};

const decrypt = (encrypted: string) => {
  var bytes = CryptoJS.AES.decrypt(encrypted, "p@sw0rd");
  var decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};

const openRate = false;

let darkMode = Appearance.getColorScheme() === "dark";

let refreshMode = Appearance.getColorScheme();

setInterval(() => {
  if (refreshMode !== Appearance.getColorScheme()) {
    refreshMode = Appearance.getColorScheme();
    RNRestart.Restart();
  }
}, 1000);

export {
  padTo2Digits,
  formatDate,
  openRate,
  checkData,
  validateEmail,
  adjust,
  getRandomInt,
  adjustLetterSpace,
  encrypt,
  decrypt,
  darkMode
};
