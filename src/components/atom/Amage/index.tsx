import { primaryColor } from "@constants";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from "react-native-reanimated";
import { SelfDevImg } from "../../../../assets";
import styles from "./styles";
import { AmageProps } from "./types";

const Amage = ({
  source,
  style,
  placeholder = SelfDevImg,
  ...props
}: AmageProps) => {
  const ready = useSharedValue(1);

  const src = !!source ? { uri: source } : placeholder;

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: ready.value ? withTiming(0.8) : withDelay(200, withTiming(1)) }
    ],
    opacity: ready.value ? withTiming(0) : withTiming(1)
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: ready.value
  }));

  const onLoad = () => (ready.value = withTiming(0));

  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        source={src}
        style={[styles.image, imageStyle]}
        resizeMethod="resize"
        onLoad={onLoad}
        {...props}
      />
      <Animated.View style={[styles.container, styles.overlay, overlayStyle]}>
        <ActivityIndicator size="small" color={primaryColor.main} />
      </Animated.View>
    </View>
  );
};

export default Amage;
