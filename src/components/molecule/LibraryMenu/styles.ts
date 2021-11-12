import { primaryColor } from "@constants";
import { StyleSheet } from "react-native";

const ICON_SIZE = 48;

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  detail: { flex: 1 },
  iconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    backgroundColor: primaryColor.main,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
