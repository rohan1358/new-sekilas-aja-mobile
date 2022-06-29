import { StyleSheet } from "react-native";
import { adjust } from "../../utils";
import {
  primaryColor,
  spacing as sp,
  colors,
  neutralColor,
  neutralColorText
} from "../../constants";
import { heightPercent, widthPercent } from "../../helpers";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    height: heightPercent(100)
  },

  boxCircle: {
    marginBottom: adjust(20),
    // paddingHorizontal: widthPercent(30),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center"
  },

  circle: {
    width: 15,
    height: 15,
    backgroundColor: neutralColor[30],
    borderRadius: 100,
    marginHorizontal: 5
  },

  circleActive: {
    width: adjust(15),
    height: adjust(8),
    backgroundColor: primaryColor.main,
    borderRadius: 100,
    marginHorizontal: 5
  },

  boxBtn: {
    alignItems: "center",
    marginVertical: adjust(30),
    position: "absolute",
    bottom: 0,
    width: widthPercent(100)
  },

  button: {
    backgroundColor: neutralColor[80],
    width: "80%",
    height: adjust(64),
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },

  textBtn: {
    color: primaryColor.main
  },

  boxBtnAction: {
    flexDirection: "row",
    width: widthPercent(100),
    paddingHorizontal: adjust(25)
  },

  buttonLewati: {
    height: adjust(64),
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },

  textBtnLewati: {},

  buttonLanjut: {
    flex: 1,
    height: adjust(64),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: neutralColor[80],
    borderRadius: adjust(16),
    flexDirection: "row"
  },

  iconArrow: {
    marginLeft: 8
  }
});

export default styles;
