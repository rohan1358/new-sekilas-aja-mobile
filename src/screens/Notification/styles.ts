import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";
import { heightPercent, widthPercent } from "../../helpers";

const styles = StyleSheet.create({
  skeleton: { flex: 1 },

  riwayatEmpty: {
    alignItems: "center",
    width: widthPercent(100),
    height: heightPercent(60)
  },

  imageEmpty: {
    width: "100%",
    height: "100%"
  },

  boxEmpty: {
    alignItems: "center"
  },

  notifEmpty: {
    fontSize: 32,
    fontWeight: "900"
  },

  tidak_ada_notif: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 8
  }
});

export default styles;
