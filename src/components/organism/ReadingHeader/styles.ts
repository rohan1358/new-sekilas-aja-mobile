import { StyleSheet } from "react-native";

const styles = ({
  textWidth,
  dotVisibility,
}: {
  textWidth: number;
  dotVisibility: boolean;
}) =>
  StyleSheet.create({
    blurLeft: { left: 0 },
    blurRight: { right: 0 },

    container: { flexDirection: "row", alignItems: "center" },

    dot: { opacity: dotVisibility ? 1 : 0 },

    semiBlur: {
      position: "absolute",
      width: 16,
      height: 48,
      borderRadius: 48,
      backgroundColor: "#ffffff99",
    },

    titleWrapper: {
      height: "100%",
      width: textWidth,
      justifyContent: "center",
    },

    wrapper: { flex: 1, overflow: "hidden", justifyContent: "center" },
  });

export default styles;
