import React from "react";
import { Image, View } from "react-native";
import { ProfilePlaceholder } from "../../../../assets";
import styles from "./styles";

const Amage = ({ source }: AmageProps) => {
  const src = !!source ? { uri: source } : ProfilePlaceholder;
  return (
    <View style={styles.container}>
      <Image source={src} style={styles.image} />
    </View>
  );
};

export default Amage;
