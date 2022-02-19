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
import { Share, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  LongPressGestureHandler,
  State,
  TapGestureHandler,
  TouchableWithoutFeedback,
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
const StoryShort = forwardRef<any, any>(
  ({ onEnd, storyStatus, storyData, color }, ref) => {
    const BAR_SIZE =
      (winWidthPercent(100) -
        spacer.sl * 2 -
        4 * (storyData?.shorts.length - 1)) /
      storyData?.shorts.length;
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

    const onShare = async () => {
      const storyText = storyData?.shorts[storyIndex].details
        .map((item: string) => `${item}. `)
        .join("");
      try {
        const result = await Share.share({
          message: `${storyText}\n\nDikutip dari "${storyData?.book_title}" oleh SekilasAja!`,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
          } else {
          }
        } else if (result.action === Share.dismissedAction) {
        }
      } catch (error) {
        //@ts-ignore
        logger("StoryShort, onShare", error?.message);
      }
    };
    return (
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          { backgroundColor: !!storyStatus ? color : neutralColor["10"] },
        ]}
      >
        <Gap vertical={spacer.sm} />

        {!!storyStatus ? (
          <Fragment>
            <View style={styles.header}>
              <Button
                style={styles.iconButton}
                onPress={() => {
                  onEnd();
                  setStoryIndex(0);
                  position.value = withTiming(closePosition);
                  dispatch(toggleBottomTab(false));
                }}
              >
                <Assets.svg.CloseX stroke={neutralColor["10"]} />
              </Button>
              <Gap horizontal={spacer.sm} />
              <View>
                <TextItem type="b.20.nc.10" numberOfLines={1}>
                  {storyStatus}
                </TextItem>
              </View>
            </View>
            <Gap vertical={spacer.sm} />
            <View style={{ flexDirection: "row" }}>
              {storyData?.shorts.map((item: any, index: number) => (
                <StoryIndicator
                  paused={paused}
                  key={`${index}`}
                  barSize={BAR_SIZE}
                  isCurrent={index === storyIndex}
                  isNext={index < storyIndex}
                  isWaiting={index > storyIndex}
                  afterAnimate={() => {
                    if (storyIndex === storyData?.shorts.length - 1) {
                      position.value = withTiming(closePosition);
                      onEnd();
                      setStoryIndex(0);
                      return;
                    }
                    setStoryIndex((current) => current + 1);
                  }}
                />
              ))}
            </View>
            <Gap vertical={spacer.xs} />

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
                    if (storyIndex === storyData?.shorts.length - 1) {
                      position.value = withTiming(closePosition);
                      return;
                    }
                    setStoryIndex((current) => current + 1);
                  }
                }
                if (nativeEvent.state === State.ACTIVE) {
                  paused.value = true;
                }
                if (nativeEvent.state === State.END) {
                  paused.value = false;
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
                {storyData?.shorts[storyIndex]?.details.map(
                  (item: string, index: number) => (
                    <View style={{ width: "100%" }} key={`${item}${index}`}>
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
                        {item}
                      </Text>
                    </View>
                  )
                )}
              </Animated.View>
            </LongPressGestureHandler>
            <View
              style={{
                justifyContent: "flex-end",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Button
                  onPress={onShare}
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
                </Button>
                <Gap horizontal={spacer.xs} />
                <Button
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
                </Button>
              </View>
              <View
                style={{
                  width: "100%",
                  height: heightDp(102) - spacer.m,
                }}
              />
              <Gap vertical={spacer.m} />
            </View>
          </Fragment>
        ) : (
          <></>
        )}
      </Animated.View>
    );
  }
);

export default StoryShort;
