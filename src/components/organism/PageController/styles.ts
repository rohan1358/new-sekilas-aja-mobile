import { StyleSheet } from "react-native";

const styles = ({
  isOnFirstPage,
  isOnLastPage,
}: {
  isOnFirstPage: boolean;
  isOnLastPage: boolean;
}) =>
  StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    nextButton: {
      opacity: isOnLastPage ? 0 : 1,
    },

    prevButton: { opacity: isOnFirstPage ? 0 : 1 },
  });

export default styles;
