import { StyleSheet } from "react-native";
import { dangerColor, neutralColor, successColor } from "../../../constants";

const styles = ({ snackType }: { snackType: "success" | "fail" | undefined }) =>
  StyleSheet.create({
    container: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: "absolute",
      backgroundColor: neutralColor[10],
    },

    snack: {
      backgroundColor:
        snackType === "success" ? successColor.main : dangerColor.main,
    },
  });

export default styles;
