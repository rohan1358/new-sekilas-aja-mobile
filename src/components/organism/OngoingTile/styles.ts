import { StyleSheet } from "react-native";
import { neutralColor, spacing as sp } from "../../../constants";
import { widthPercent } from "../../../helpers";

const styles = ({ tileHeight }: { tileHeight: number }) =>
  StyleSheet.create({
    child: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: sp.xs,
      paddingHorizontal: sp.sm,
      alignItems: "center",
    },
    container: {
      width: widthPercent(100) - sp.sl * 2,
      left: sp.sl,
      backgroundColor: neutralColor[10],
      top: -24 - tileHeight / 2,
      borderRadius: 12,
      elevation: 3,
    },

    imageContainer: { width: 40, height: 60 },
  });

export default styles;
