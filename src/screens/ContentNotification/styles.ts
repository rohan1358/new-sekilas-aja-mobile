import { neutralColor, primaryColor } from "@constants";
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
    fontWeight: "900",
    color: neutralColor[90]
  },

  tidak_ada_notif: {
    fontSize: 16,
    fontWeight: "500",
    color: neutralColor[60],
    marginTop: 8
  },
  image: {
    width: 390,
    height: 195,
    alignSelf: "center"
    // height: "100%"
  },
  btnSubs: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginTop: 20,
    backgroundColor: "#434A6B"
  }
});

export default styles;
