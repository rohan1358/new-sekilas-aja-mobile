import { neutralColor, spacer } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  bar: {
    height: spacer.xxs,
    borderRadius: 100,
    position: "absolute",
    backgroundColor: neutralColor["10"],
  },
  barWrapper: {
    height: spacer.xxs,
    borderRadius: 100,
    backgroundColor: neutralColor.darkFocus,
    overflow: "hidden",
  },

  container: {
    flexDirection: "row",
  },
});

export default styles;
