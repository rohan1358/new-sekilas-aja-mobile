import React from "react";
import { View } from "react-native";
import { Amage } from "../../atom";
import styles from "./styles";

const ImageBanner = ({ source }: ImageBannerProps) => {
  return (
    <View style={styles.container}>
      <Amage style={styles.image} source={source} />
    </View>
  );
};

export default ImageBanner;
