import { StyleSheet } from "react-native";
import { dangerColor, successColor } from "../../../constants";

const styles = ({
  snackType,
  backgroundColor
}: {
  snackType: "success" | "fail" | undefined;
  backgroundColor: string;
}) =>
  StyleSheet.create({
    container: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: "absolute",
      backgroundColor
    },

    snack: {
      backgroundColor:
        snackType === "success" ? successColor.main : dangerColor.main
    }
  });

export default styles;
