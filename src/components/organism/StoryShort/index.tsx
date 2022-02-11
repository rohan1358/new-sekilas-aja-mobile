import Assets from "@assets";
import { Button, Gap, TextItem } from "@atom";
import { dangerColor, neutralColor, spacer } from "@constants";
import { heightDp, widthDp, winHeightPercent, winWidthPercent } from "@helpers";
import React, { forwardRef, Fragment, useImperativeHandle } from "react";
import { Text, View } from "react-native";
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

const StoryShort = forwardRef<any, any>((props, ref) => {
  const dispatch = useDispatch();
  const position = useSharedValue(closePosition);
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

  useImperativeHandle(ref, () => ({
    close: () => (position.value = withTiming(closePosition)),
    open: () => (position.value = withTiming(openPosition)),
  }));
  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View>
        <Gap vertical={spacer.sm} />
        <View style={styles.header}>
          <Button
            style={styles.iconButton}
            onPress={() => {
              position.value = withTiming(closePosition);
              dispatch(toggleBottomTab(false));
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
        <View style={{ flexDirection: "row" }}>
          {[1, 2, 3, 4].map((item, index) => (
            <Fragment key={`${item}`}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: widthDp(
                      (344 - 4 * ([1, 2, 3, 4].length - 1)) /
                        [1, 2, 3, 4].length
                    ),
                    height: spacer.xxs,
                    borderRadius: 100,
                    backgroundColor: neutralColor.darkFocus,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      width: widthDp(
                        (344 - 4 * ([1, 2, 3, 4].length - 1)) /
                          [1, 2, 3, 4].length
                      ),
                      height: spacer.xxs,
                      borderRadius: 100,
                      position: "absolute",
                      backgroundColor: neutralColor["10"],
                      left: -widthDp(
                        (344 - 4 * ([1, 2, 3, 4].length - 1)) /
                          [1, 2, 3, 4].length
                      ),
                    }}
                  />
                </View>
                <Gap horizontal={spacer.xxs} />
              </View>
            </Fragment>
          ))}
        </View>
        <Gap vertical={spacer.xs} />
      </View>
      <View style={{ paddingVertical: spacer.m }}>
        <Text
          style={{
            fontFamily: "NotoSans-Black",
            fontSize: widthDp(winHeightPercent(100) < 823 ? 24 : 32),
            color: neutralColor["10"],
            lineHeight: widthDp((winHeightPercent(100) < 823 ? 24 : 32) * 1.2),
            letterSpacing: widthDp(
              (winHeightPercent(100) < 823 ? 24 : 32) * -0.022
            ),
          }}
        >
          Saya sering menulis bahwa keuangan pribadi adalah pribadi.
        </Text>
        <Gap vertical={spacer.sl} />
        <TextItem type="b.32.nc.10">
          Yang saya maksud dengan itu adalah bahwa apa yang mungkin menjadi
          keputusan keuangan yang baik bagi saya mungkin bukan keputusan
          keuangan yang baik bagi Anda.
        </TextItem>
      </View>
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
      {/* <Button
            style={{ width: 240, height: 240, backgroundColor: "red" }}
            onPress={() => dispatch(toggleBottomTab())}
          ></Button> */}
    </Animated.View>
  );
});

export default StoryShort;
