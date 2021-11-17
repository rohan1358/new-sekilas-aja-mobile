import { StyleSheet } from "react-native";
import { winHeightPercent } from "../../../helpers/helper";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: winHeightPercent(100) - 64 - 32 * 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
