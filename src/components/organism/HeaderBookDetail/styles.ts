import { neutralColor, primaryColor } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor.main,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 10
  },

  boxRight: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40
  },

  btn: {
    // borderWidth: 1,
    padding: 10
  },

  btnHeart: {
    backgroundColor: neutralColor[90],
    borderRadius: 100,
    marginLeft: 10,
    color: "lightblue",
    fontSize: 20
  },
  btnHeartActive: {
    backgroundColor: neutralColor[40],
    borderRadius: 100,
    marginLeft: 10,
    color: "lightblue",
    fontSize: 20
  }
});

export default styles;
