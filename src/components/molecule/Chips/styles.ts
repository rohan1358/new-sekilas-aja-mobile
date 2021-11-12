import { neutralColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";

const styles = ({ isSelected }: { isSelected: boolean }) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: sp.sm,
      paddingVertical: sp.xxs,
      backgroundColor: neutralColor[isSelected ? 90 : 20],
      alignSelf: "flex-start",
      borderRadius: 6,
      borderWidth: 2,
      borderColor: neutralColor[isSelected ? 90 : 50],
    },

    icon: { width: 16, height: 16, top: -1 },
  });

export default styles;
