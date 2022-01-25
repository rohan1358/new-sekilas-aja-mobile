import { StyleSheet } from "react-native";
import {
  primaryColor,
  spacing as sp,
  colors,
  neutralColor,
} from "../../constants";
import { heightPercent, widthPercent } from "../../helpers";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },

  content: {
    height: heightPercent(90),
  },

  boxCircle: {
    // marginTop: 20,
    // paddingHorizontal: widthPercent(30),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  circle: {
    width: 15,
    height: 15,
    backgroundColor: neutralColor[30],
    borderRadius: 100,
    marginHorizontal: 5,
  },

  circleActive: {
    width: 15,
    height: 8,
    backgroundColor: primaryColor.main,
    borderRadius: 100,
    marginHorizontal: 5,
  },

  boxBtn: {
    alignItems: "center",
    marginVertical: 20,
  },

  button: {
    backgroundColor: neutralColor[80],
    width: "80%",
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  textBtn: {
    color: primaryColor.main,
  },

  boxBtnAction: {
    flexDirection: "row",
    width: widthPercent(100),
    paddingHorizontal: 25,
  },

  buttonLewati: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  textBtnLewati: {
    color: neutralColor[80],
  },

  buttonLanjut: {
    flex: 1,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: neutralColor[80],
    borderRadius: 16,
    flexDirection: "row",
  },

  iconArrow: {
    marginLeft: 8,
  },
});

export default styles;
