import { spacer } from "@constants";
import { logger, widthDp } from "@helpers";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { withPause } from "react-native-redash";
import Gap from "../Gap";
import styles from "./styles";

interface StoryIndicatorProps {
  barSize: number;
  isCurrent: boolean;
  isNext: boolean;
  isWaiting: boolean;
  afterAnimate(): void;
  paused: SharedValue<boolean>;
}

const StoryIndicator = ({
  barSize,
  isCurrent,
  isNext,
  isWaiting,
  afterAnimate,
  paused,
}: StoryIndicatorProps) => {
  const barPosition = useSharedValue(-barSize);

  const barStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: barPosition.value }],
  }));

  useEffect(() => {
    if (isCurrent) {
      barPosition.value = -barSize;
      barPosition.value = withPause(
        withTiming(
          0,
          {
            easing: Easing.linear,
            duration: 15000,
          },
          (isFinished) => {
            if (isFinished) {
              runOnJS(afterAnimate)();
            }
          }
        ),
        paused
      );
    }
  }, [isCurrent]);

  useEffect(() => {
    if (isNext) {
      barPosition.value = 0;
    }
  }, [isNext]);

  useEffect(() => {
    if (isWaiting) {
      barPosition.value = -barSize;
    }
  }, [isWaiting]);

  const barWrapperStyle = { width: widthDp(barSize) };

  return (
    <View style={styles.container}>
      <View style={[styles.barWrapper, barWrapperStyle]}>
        <Animated.View style={[barStyle, styles.bar, barWrapperStyle]} />
      </View>
      <Gap horizontal={spacer.xxs} />
    </View>
  );
};

export default StoryIndicator;
