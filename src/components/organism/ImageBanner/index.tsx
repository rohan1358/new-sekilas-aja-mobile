import React from "react";
import { View } from "react-native";
import { Amage } from "../../atom";
import styles from "./styles";

const ImageBanner = ({ placeholder }: ImageBannerProps) => {
  return (
    <View style={styles.container}>
      <Amage style={styles.image} placeholder={placeholder} />
    </View>
  );
};

export default ImageBanner;
