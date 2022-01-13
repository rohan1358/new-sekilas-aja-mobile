import { neutralColor, primaryColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";

const TIP_COLOR = neutralColor[10];
const TIP_SIZE = 16;

const styles = ({
  isOnFirstPage,
  isOnLastPage
}: {
  isOnFirstPage: boolean;
  isOnLastPage: boolean;
}) =>
  StyleSheet.create({
    actions: {
      backgroundColor: neutralColor[90],
      borderRadius: 12,
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center"
    },
    actionWrapper: {
      width: "100%",
      position: "absolute",
      bottom: 0,
      alignItems: "center"
    },

    button: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: sp.xs,
      paddingHorizontal: sp.sm
    },

    contentContainerStyle: { paddingHorizontal: sp.sl },

    linearGradient: {
      width: "100%",
      height: "100%",
      paddingVertical: sp.sl,
      position: "absolute"
    },

    tip: {
      position: "absolute",
      width: TIP_SIZE,
      height: TIP_SIZE,
      top: -TIP_SIZE,
      right: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: TIP_SIZE,
      borderLeftWidth: TIP_SIZE,
      borderTopColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: TIP_COLOR,
      borderLeftColor: "transparent"
    },
    tipButton: { paddingHorizontal: sp.s, paddingVertical: sp.xs },
    tipContainer: { position: "absolute", top: 64, right: 44 },
    tipContent: { backgroundColor: TIP_COLOR },

    skeleton: { flex: 1 },

    titleSelect: {
      fontSize: 16,
      color: primaryColor.main,
      fontWeight: "700",
      marginLeft: 10
    },
    textBtnHapus: {
      color: "#CB3168"
    }
  });

export default styles;
