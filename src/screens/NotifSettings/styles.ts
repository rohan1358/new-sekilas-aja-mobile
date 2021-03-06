import { colors, neutralColor, neutralColorText } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  skeleton: { flex: 1 },

  sectionContent: {
    borderTopWidth: 1,
    borderColor: neutralColor[60],
    paddingTop: 32
  },

  subTitle: {
    marginLeft: 32
  },

  list: {
    marginHorizontal: 32,
    marginVertical: 8
  },

  listPreferens: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  boxText: {
    maxWidth: "65%"
  },

  titleList: {
    fontSize: 15,
    fontWeight: "500"
  },

  textContent: {
    fontSize: 14,
    marginTop: 4
  },

  textTime: {},

  containerModal: {
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  contentModal: {
    width: "80%",
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingTop: 25,
    overflow: "hidden"
  },

  boxHeadModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25
  },

  boxTime: {
    backgroundColor: "#ECF1F7",
    marginVertical: 20
  },

  textInput: {
    fontSize: 35,
    padding: 0
  },

  boxAction: {
    paddingHorizontal: 0
  },

  btnAction: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderColor: neutralColor[30]
  },

  btnSimpan: {
    backgroundColor: neutralColor[90],
    borderColor: neutralColor[90]
  }
});

export default styles;
