import { StyleSheet } from "react-native";
import { neutralColor, spacing as sp } from "../../../constants";

const styles = StyleSheet.create({
  seed: {
    paddingVertical: sp.xxs,
    paddingHorizontal: sp.xs,
    backgroundColor: neutralColor[20],
    borderRadius: 4,
    alignSelf: "flex-start",
  },
});

export default styles;
