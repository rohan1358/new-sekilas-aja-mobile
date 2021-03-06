import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: neutralColor[30]
  },
  container_active: {
    paddingHorizontal: 25,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: neutralColor[30],
    backgroundColor: "#FEFBEA"
  },

  title: {
    fontSize: 20,
    fontWeight: "700"
  },
  title_active: {
    fontSize: 20,
    fontWeight: "700"
  },

  text: {
    fontSize: 16,
    marginVertical: 8
  },
  text_active: {
    fontSize: 16,
    marginVertical: 8
  },

  time: {
    fontSize: 12,
    fontWeight: "500"
  },
  time_active: {
    fontSize: 12,
    fontWeight: "500",
    color: "#CB3168"
  },

  boxImage: {
    width: "100%",
    height: 168,
    overflow: "hidden",
    borderRadius: 16,
    marginBottom: 8
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },

  boxImageAnActive: {
    opacity: 0.6
  }
});

export default styles;
