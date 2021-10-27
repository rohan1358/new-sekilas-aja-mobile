import React from "react";
import { Image, View } from "react-native";
import { ProfilePlaceholder } from "../../../../assets";
import styles from "./styles";
import { AmageProps } from "./types";

const Amage = ({ source, style }: AmageProps) => {
  const src = !!source ? { uri: source } : ProfilePlaceholder;
  return (
    <View style={[styles.container, style]}>
      <Image source={src} style={styles.image} />
    </View>
  );
};

export default Amage;
