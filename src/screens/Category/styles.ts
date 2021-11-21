import { neutralColor, primaryColor, spacing as sp } from "@constants";
import { StyleSheet } from "react-native";

const CONTAINER_RADIUS = 24;

const styles = StyleSheet.create({
  columnWrapperStyle: { justifyContent: "space-between" },
  contentContainerStyle: { padding: sp.sl },

  skeleton: { flex: 1 },
});

export default styles;
