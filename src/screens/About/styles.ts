import { neutralColor } from "@constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    borderTopWidth: 1,
    borderColor: neutralColor[70],
    padding: 25
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25
  },

  text: {
    fontSize: 16,
    marginBottom: 25
  }
});

export default styles;
