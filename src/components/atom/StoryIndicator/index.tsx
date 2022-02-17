import { spacer } from "@constants";
import { logger, widthDp } from "@helpers";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Gap from "../Gap";
import styles from "./styles";

interface StoryIndicatorProps {
  barSize: number;
  isCurrent: boolean;
  isNext: boolean;
  isWaiting: boolean;
  afterAnimate(): void;
}

const StoryIndicator = ({
  barSize,
  isCurrent,
  isNext,
  isWaiting,
  afterAnimate,
}: StoryIndicatorProps) => {
  const barPosition = useSharedValue(-barSize);

  const barStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: barPosition.value }],
  }));

  const animateCallback = (isFinished: boolean | undefined) => {
    "worklet";
    // afterAnimate();
    logger({ isFinished });
  };

  useEffect(() => {
    if (isCurrent) {
      barPosition.value = -barSize;
      barPosition.value = withTiming(
        0,
        {
          easing: Easing.linear,
          duration: 7000,
        },
        (isFinished) => {
          if (isFinished) {
            runOnJS(afterAnimate)();
          }
        }
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
