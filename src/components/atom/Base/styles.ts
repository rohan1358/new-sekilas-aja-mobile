import { StyleSheet } from "react-native";
import { neutralColor } from "../../../constants";

const styles = () =>
  StyleSheet.create({
    container: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      position: "absolute",
      backgroundColor: neutralColor[10],
    },
  });

export default styles;
