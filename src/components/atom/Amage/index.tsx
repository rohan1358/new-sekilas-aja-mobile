import React, { useState } from "react";
import { Animated, View } from "react-native";
import { ProfilePlaceholder } from "../../../../assets";
import styles from "./styles";
import { AmageProps } from "./types";

const Amage = ({
  source,
  style,
  placeholder = ProfilePlaceholder,
}: AmageProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const src = !!source ? { uri: source } : placeholder;
  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        source={src}
        style={styles.image}
        resizeMethod="resize"
        onLoad={() => setIsLoaded(true)}
      />
    </View>
  );
};

export default Amage;
