import Assets, { ArrowLeft } from "@assets";
import {
  AdaptiveText,
  Amage,
  Button,
  Gap,
  StoryIndicator,
  TextItem
} from "@atom";
import { neutralColor, spacer } from "@constants";
import { logger, widthDp, winHeightPercent, winWidthPercent } from "@helpers";
import { ReduxState } from "@rux";
import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useState
} from "react";
import { Pressable, Share, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { closeBottomTab } from "../../../redux/actions";
import styles from "./style";
import {
  checkSavedShorts,
  fireRemoveShorts,
  fireSaveShorts
} from "../../../services/shorts";

const closePosition = winHeightPercent(100);
const openPosition = 0;
const StoryShort = forwardRef<any, any>(
  ({ onEnd, storyStatus, storyData, color, onLastStoryPress }, ref) => {
    const BAR_SIZE =
      (winWidthPercent(100) - spacer.sl * 2) / storyData?.shorts.length;

    const {
      editProfile: { profile }
    } = useSelector((state: ReduxState) => state);

    const dispatch = useDispatch();
    const position = useSharedValue(closePosition);
    const paused = useSharedValue(false);
    const containerStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: position.value }]
    }));

    const [storyIndex, setStoryIndex] = useState(0);

    useImperativeHandle(ref, () => ({
      close: () => (position.value = withTiming(closePosition)),
      open: () => (position.value = withTiming(openPosition))
    }));

    const afterAnimate = async () => {
      if (storyIndex === storyData?.shorts.length - 1) {
        position.value = withTiming(closePosition);
        dispatch(closeBottomTab());

        onEnd();
        setStoryIndex(0);
        return;
      }
      setStoryIndex((current) => current + 1);
    };

    const onClosePress = async () => {
      dispatch(closeBottomTab());

      onEnd();
      setStoryIndex(0);
      position.value = withTiming(closePosition);
    };

    const onShare = async () => {
      const storyText = storyData?.shorts[storyIndex].details
        .map((item: string) => `${item}. `)
        .join("");
      try {
        await Share.share({
          message: `${storyText}\n\nDikutip dari "${storyData?.book_title}" oleh SekilasAja!`
        });
      } catch (error) {
        //@ts-ignore
        logger("StoryShort, onShare", error?.message);
      }
    };

    const saveShorts = () => {
      let id_shorts = storyData?.shorts[storyIndex]["kilas"];
      let user = profile.id;
      let shorts_books = storyData["id"];

      const body = {
        user,
        shorts_books,
        shorts_cover: storyData["book_cover"],
        id_shorts
      };

      checkSavedShorts(`${id_shorts}-${user}-${shorts_books}`)
        .then((res) => {
          fireSaveShorts(`${id_shorts}-${user}-${shorts_books}`, body);
        })
        .catch(() => {
          fireRemoveShorts(`${id_shorts}-${user}-${shorts_books}`);
        });
    };

    return (
      <Animated.View
        style={[
          styles.container,
          containerStyle,
          { backgroundColor: !!storyStatus ? color : neutralColor["10"] }
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
              <View style={{ flex: 1 }}>
                <TextItem type="b.20.nc.10" numberOfLines={1}>
                  {storyStatus}
                </TextItem>
              </View>
            </View>
            <Gap vertical={spacer.sm} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
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
            <Pressable
              onLongPress={(e) => (paused.value = true)}
              style={{ flex: 1 }}
              onPressOut={() => (paused.value = false)}
              onPress={({ nativeEvent }) => {
                const tapPosition = nativeEvent.pageX;
                const isLeft = tapPosition < winWidthPercent(40);
                if (isLeft) {
                  if (storyIndex === 0) {
                    onEnd();
                    setStoryIndex(0);
                    position.value = withTiming(closePosition);
                    return;
                  }
                  setStoryIndex((current) => current - 1);
                } else {
                  if (storyIndex === storyData?.shorts.length - 1) {
                    onEnd();
                    setStoryIndex(0);
                    position.value = withTiming(closePosition);
                    return;
                  }
                  setStoryIndex((current) => current + 1);
                }
              }}
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
            </Pressable>
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
                  <Button
                    onPress={() => {
                      saveShorts();
                    }}
                    style={styles.footerButton}
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
