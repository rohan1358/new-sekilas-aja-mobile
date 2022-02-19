import Assets, { ArrowLeft } from "@assets";
import {
  AdaptiveText,
  Amage,
  Button,
  Gap,
  StoryIndicator,
  TextItem,
} from "@atom";
import { neutralColor, spacer } from "@constants";
import {
  heightDp,
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
import { Share, View } from "react-native";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { toggleBottomTab } from "../../../redux/actions";
import styles from "./style";

const closePosition = winHeightPercent(100);
const openPosition = 0;
const StoryShort = forwardRef<any, any>(
  ({ onEnd, storyStatus, storyData, color, onLastStoryPress }, ref) => {
    const BAR_SIZE =
      (winWidthPercent(100) -
        spacer.sl * 2 -
        4 * (storyData?.shorts.length - 1)) /
      storyData?.shorts.length;
    const dispatch = useDispatch();
    const position = useSharedValue(closePosition);
    const paused = useSharedValue(false);
    const containerStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: position.value }],
    }));

    const [storyIndex, setStoryIndex] = useState(0);

    useImperativeHandle(ref, () => ({
      close: () => (position.value = withTiming(closePosition)),
      open: () => (position.value = withTiming(openPosition)),
    }));

    const afterAnimate = () => {
      if (storyIndex === storyData?.shorts.length - 1) {
        position.value = withTiming(closePosition);
        onEnd();
        dispatch(toggleBottomTab(false));
        setStoryIndex(0);
        return;
      }
      setStoryIndex((current) => current + 1);
    };

    const onClosePress = () => {
      onEnd();
      setStoryIndex(0);
      position.value = withTiming(closePosition);
      dispatch(toggleBottomTab(false));
    };

    const onShare = async () => {
      const storyText = storyData?.shorts[storyIndex].details
        .map((item: string) => `${item}. `)
        .join("");
      try {
        await Share.share({
          message: `${storyText}\n\nDikutip dari "${storyData?.book_title}" oleh SekilasAja!`,
        });
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
              <Button style={styles.iconButton} onPress={onClosePress}>
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
                  afterAnimate={afterAnimate}
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
              <Animated.View style={styles.content}>
                {storyData?.shorts[storyIndex]?.details.map(
                  (item: string, index: number) => (
                    <View style={{ width: "100%" }} key={`${item}${index}`}>
                      <AdaptiveText
                        type="text3xl/black"
                        textColor={neutralColor["10"]}
                      >
                        {item}
                      </AdaptiveText>
                    </View>
                  )
                )}
              </Animated.View>
            </LongPressGestureHandler>
            <View style={styles.footer}>
              {storyData?.shorts.length - 1 === storyIndex ? (
                <Button
                  style={styles.tile}
                  onPress={() => onLastStoryPress(storyStatus)}
                >
                  <View style={styles.box}>
                    <Amage
                      source={storyData?.book_cover}
                      style={{ width: "100%", aspectRatio: 2 / 3 }}
                    />
                  </View>
                  <Gap horizontal={widthDp(8)} />
                  <View style={{ flex: 1 }}>
                    <AdaptiveText
                      textColor={neutralColor["70"]}
                      type="textXs/medium"
                    >
                      Baca lebih lanjut
                    </AdaptiveText>
                    <AdaptiveText
                      textColor={neutralColor["100"]}
                      type="textBase/bold"
                      numberOfLines={1}
                    >
                      {storyStatus}
                    </AdaptiveText>
                  </View>
                  <Gap horizontal={widthDp(8)} />
                  <View style={styles.box}>
                    <ArrowLeft
                      stroke={neutralColor["80"]}
                      width={24}
                      height={24}
                      style={{ transform: [{ rotate: "180deg" }] }}
                    />
                  </View>
                </Button>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Button onPress={onShare} style={styles.footerButton}>
                    <TextItem type="b.16.nc.10">Bagikan</TextItem>
                    <Gap horizontal={spacer.xxs} />
                    <Assets.svg.ShareIcon
                      stroke={neutralColor["10"]}
                      width={16}
                      height={16}
                    />
                  </Button>
                  <Gap horizontal={spacer.xs} />
                  <Button style={styles.footerButton}>
                    <TextItem type="b.16.nc.10">Simpan</TextItem>
                    <Gap horizontal={spacer.xxs} />
                    <Assets.svg.Bookmark
                      stroke={neutralColor["10"]}
                      width={16}
                      height={16}
                    />
                  </Button>
                </View>
              )}
              <View style={styles.footerGap} />
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
