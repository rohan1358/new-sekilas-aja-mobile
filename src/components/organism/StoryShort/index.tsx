import Assets from "@assets";
import { Button, Gap, StoryIndicator, TextItem } from "@atom";
import { dangerColor, neutralColor, spacer } from "@constants";
import {
  heightDp,
  heightInterpolate,
  logger,
  widthDp,
  winHeightPercent,
  winWidthPercent,
} from "@helpers";
import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useState,
} from "react";
import { Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  LongPressGestureHandler,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { withPause } from "react-native-redash";
import { useDispatch } from "react-redux";
import { toggleBottomTab } from "../../../redux/actions";
import styles from "./style";

const closePosition = winHeightPercent(100);
const openPosition = 0;
const StoryShort = forwardRef<any, any>((props, ref) => {
  const storyData = [
    "Saya sering menulis bahwa keuangan pribadi adalah pribadi.",
    "Saya sering membaca kamu adalah teman aku.",
    "Kamu tidak tau apa yang aku pikirkan selama ini",
    "Berharap takda satu orang pun yang tau",
  ];
  const BAR_SIZE = (344 - 4 * (storyData.length - 1)) / storyData.length;
  const dispatch = useDispatch();
  const position = useSharedValue(closePosition);
  const barPosition = useSharedValue(-BAR_SIZE);
  const paused = useSharedValue(false);
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

  const [storyIndex, setStoryIndex] = useState(0);

  const barStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: barPosition.value }],
  }));

  useImperativeHandle(ref, () => ({
    close: () => (position.value = withTiming(closePosition)),
    open: () => (position.value = withTiming(openPosition)),
  }));
  /*
   readonly UNDETERMINED: 0;
    readonly FAILED: 1;
    readonly BEGAN: 2;
    readonly CANCELLED: 3;
    readonly ACTIVE: 4;
    readonly END: 5;
  */

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View>
        <Gap vertical={spacer.sm} />
        <View style={styles.header}>
          <Button
            style={styles.iconButton}
            onPress={() => {
              if (barPosition.value === 0) {
                barPosition.value = withTiming(-BAR_SIZE, {
                  easing: Easing.linear,
                  duration: 1000,
                });
              } else {
                barPosition.value = withPause(
                  withTiming(0, {
                    easing: Easing.linear,
                    duration: 15 * 1000,
                  }),
                  paused
                );
              }
              // position.value = withTiming(closePosition);
              // dispatch(toggleBottomTab(false));
            }}
          >
            <Assets.svg.CloseX stroke={neutralColor["10"]} />
          </Button>
          <Gap horizontal={spacer.sm} />
          <TextItem type="b.20.nc.10" numberOfLines={1}>
            {"The Pyschology of Money"}
          </TextItem>
        </View>
        <Gap vertical={spacer.sm} />
        {/* <Button
          style={styles.iconButton}
          onPress={() => {
            if (paused.value) {
              paused.value = false;
            } else {
              paused.value = true;
            }
          }}
        >
          <Assets.svg.CloseX stroke={neutralColor["10"]} />
        </Button> */}
        <View style={{ flexDirection: "row" }}>
          {storyData.map((item, index) => (
            <StoryIndicator
              key={`${index}`}
              barSize={BAR_SIZE}
              isCurrent={index === storyIndex}
              isNext={index < storyIndex}
              isWaiting={index > storyIndex}
              afterAnimate={() => {
                if (storyIndex === storyData.length - 1) {
                  position.value = withTiming(closePosition);
                  return;
                }
                setStoryIndex((current) => current + 1);
              }}
            />
          ))}
        </View>
        <Gap vertical={spacer.xs} />
      </View>
      <LongPressGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.FAILED) {
            const tapPosition = nativeEvent.absoluteX;
            const isLeft = tapPosition < winWidthPercent(40);
            if (isLeft) {
              if (storyIndex === 0) {
                position.value = withTiming(closePosition);
                return;
              }
              setStoryIndex((current) => current - 1);
            } else {
              if (storyIndex === storyData.length - 1) {
                position.value = withTiming(closePosition);
                return;
              }
              setStoryIndex((current) => current + 1);
            }
          }
          if (nativeEvent.state === State.ACTIVE) {
            logger("I'm being pressed for so long");
          }
        }}
        minDurationMs={800}
      >
        <Animated.View
          style={{
            paddingVertical: spacer.m,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "NotoSans-Black",
              fontSize: widthDp(heightInterpolate(32)),
              color: neutralColor["10"],
              lineHeight: widthDp(heightInterpolate(32)) * 1.2,
              letterSpacing: widthDp(
                (winHeightPercent(100) < 823 ? 24 : 32) * -0.022
              ),
            }}
          >
            {storyData[storyIndex]}
          </Text>
        </Animated.View>
      </LongPressGestureHandler>
      <View
        style={{
          justifyContent: "flex-end",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: neutralColor.darkFocus,
              paddingVertical: spacer.xxs,
              paddingHorizontal: spacer.xs,
              borderRadius: spacer.xs,
            }}
          >
            <TextItem type="b.16.nc.10">Bagikan</TextItem>
            <Gap horizontal={spacer.xxs} />
            <Assets.svg.ShareIcon
              stroke={neutralColor["10"]}
              width={16}
              height={16}
            />
          </View>
          <Gap horizontal={spacer.xs} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: neutralColor.darkFocus,
              paddingVertical: spacer.xxs,
              paddingHorizontal: spacer.xs,
              borderRadius: spacer.xs,
            }}
          >
            <TextItem type="b.16.nc.10">Simpan</TextItem>
            <Gap horizontal={spacer.xxs} />
            <Assets.svg.Bookmark
              stroke={neutralColor["10"]}
              width={16}
              height={16}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: heightDp(102) - spacer.m,
          }}
        />
        <Gap vertical={spacer.m} />
      </View>
    </Animated.View>
  );
});

export default StoryShort;
