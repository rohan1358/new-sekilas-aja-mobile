import React from "react";
import { View } from "react-native";
import { Amage } from "../..";
import styles from "./styles";

const ImageBanner = () => {
  return (
    <View style={styles.container}>
      <Amage style={styles.image} />
    </View>
  );
};

export default ImageBanner;
