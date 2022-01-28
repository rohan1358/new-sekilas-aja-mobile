import { neutralColor, primaryColor } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor.main,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5
  },

  btn: {
    padding: 12.5
  },

  gradientLeft: {
    width: 60,
    height: "100%",
    position: "absolute",
    left: 60,
    zIndex: 1
  },

  gradientRight: {
    width: 60,
    height: "100%",
    position: "absolute",
    right: 60,
    zIndex: 1
  },

  boxTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 13
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: neutralColor[90]
  }
});

export default styles;
