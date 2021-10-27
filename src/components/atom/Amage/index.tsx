import { primaryColor } from "@constants";
import React, { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
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

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: isLoaded ? withTiming(1) : withTiming(0.8) }],
  }));

  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        source={src}
        style={[styles.image, imageStyle]}
        resizeMethod="resize"
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <View style={[styles.container, styles.overlay]}>
          <ActivityIndicator size="small" color={primaryColor.main} />
        </View>
      )}
    </View>
  );
};

export default Amage;
