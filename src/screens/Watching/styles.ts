import { neutralColor, primaryColor } from "@constants";
import { Dimensions, StyleSheet } from "react-native";
import { heightPercent, widthPercent } from "../../helpers";

const styles = StyleSheet.create({
  content: {
    backgroundColor: primaryColor.main,
    flex: 1,
    paddingHorizontal: 25
  },
  boxImage: {
    height: heightPercent(25)
    // marginVertical: 23
  },
  boxImageLanscape: {
    width: heightPercent(100),
    height: widthPercent(100)
    // marginVertical: 23
  },

  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  backgroundVideoIos:{
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingTop: 415
  },

  loadVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  loadVideoActive: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  text: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 20,
    color: neutralColor[70],
    fontWeight: "500"
  },

  SliderContainer: {
    height: heightPercent(5)
  },

  trackSliderStyle: {
    height: 8,
    borderRadius: 10
  },

  boxTextTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  boxAction: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: heightPercent(5),
    alignItems: "center",
    paddingHorizontal: 10
  },

  play: {
    backgroundColor: neutralColor[90],
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50
  },

  rotate: {
    width: 10,
    height: 10
  },

  iconPlay: {
    marginLeft: 5
  },

  boxFooter: {
    alignItems: "center"
  },

  speedText: {
    fontWeight: "700",
    marginBottom: heightPercent(5)
  },

  SelectBar: {
    backgroundColor: neutralColor[90],
    marginHorizontal: 25,
    height: 44,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: heightPercent(10)
  },

  btnBar: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },

  titleSelect: {
    fontSize: 16,
    color: primaryColor.main,
    fontWeight: "700",
    marginLeft: 10
  },

  boxTitleSheet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 15
  },

  titleSheet: {
    fontSize: 24,
    fontWeight: "700",
    color: neutralColor[90]
  },

  boxListSpeed: {
    borderTopWidth: 1,
    borderTopColor: neutralColor[50],
    marginBottom: heightPercent(8)
  },

  listSpeed: {
    borderBottomWidth: 1,
    borderBottomColor: neutralColor[50],
    paddingVertical: 8,
    paddingHorizontal: 24
  }
});

export default styles;
