import { StyleSheet } from "react-native";
import { neutralColor, spacing as sp } from "../../../constants";

const styles = ({ bg = neutralColor[20] }: { bg?: string }) =>
  StyleSheet.create({
    seed: {
      paddingVertical: sp.xxs,
      paddingHorizontal: sp.xs,
      backgroundColor: bg,
      borderRadius: 4,
      alignSelf: "flex-start",
    },
  });

export default styles;
