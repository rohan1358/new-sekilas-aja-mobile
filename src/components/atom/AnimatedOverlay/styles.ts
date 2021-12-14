import { StyleSheet } from "react-native";
import { heightPercent, widthPercent } from "../../../helpers";

const styles = StyleSheet.create({
  container: {
    width: widthPercent(100),
    height: heightPercent(100),
    backgroundColor: "#0009",
    position: "absolute",
  },
});

export default styles;
