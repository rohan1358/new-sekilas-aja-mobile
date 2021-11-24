import { ArrowLeft, MenuDots } from "@assets";
import { Base, Gap, TextItem, Button } from "@components";
import { neutralColor, spacing as sp } from "@constants";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { HeaderStateProps } from "../../components/atom/Base/types";
import { logger } from "../../helpers/helper";

const ReadingHeader = () => {
  const [textWidth, setTextWidth] = useState(1000);
  const [actualHeaderWidth, setActualHeaderWidth] = useState<number>(0);

  const translate = useMemo(
    () => actualHeaderWidth - textWidth - 16,
    [actualHeaderWidth, textWidth]
  );

  const position = useSharedValue(0);

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const animate = () => {
    position.value = withSequence(
      withTiming(translate, {
        duration: 5000,
      }),
      withDelay(
        3000,
        withTiming(0, {
          duration: 5000,
        })
      )
    );
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      animate();
    }, 3000);
    return () => {
      clearTimeout(debounce);
    };
  }, [actualHeaderWidth, textWidth]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Gap horizontal={20} />
      <View
        style={{
          width: 48,
          height: 48,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ArrowLeft stroke={neutralColor[70]} width={24} height={24} />
      </View>
      <View
        style={{ flex: 1, overflow: "hidden", justifyContent: "center" }}
        onLayout={(e) => setActualHeaderWidth(e.nativeEvent.layout.width)}
      >
        <Button
          style={{
            height: "100%",
            width: textWidth,
            justifyContent: "center",
          }}
          onPress={() => animate()}
        >
          <Animated.View style={textStyle}>
            <TextItem
              type="r.20.nc.90"
              onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
              style={{ alignSelf: "flex-start" }}
            >
              Bab 3: Tak Pernah Cukup Untuk Hidup Mandiri
            </TextItem>
          </Animated.View>
        </Button>
        <View
          style={{
            position: "absolute",
            width: 16,
            height: 48,
            borderRadius: 48,
            backgroundColor: "#ffffff99",
          }}
        />
        <View
          style={{
            position: "absolute",
            width: 16,
            height: 48,
            borderRadius: 48,
            backgroundColor: "#ffffff99",
            right: 0,
          }}
        />
      </View>
      <Gap horizontal={sp.sm} />
      <View
        style={{
          width: 48,
          height: 48,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MenuDots stroke={neutralColor[70]} width={24} height={24} />
      </View>
      <Gap horizontal={20} />
    </View>
  );
};

const Reading = () => {
  const headerState: HeaderStateProps = {
    visible: true,
    type: "custom",
    customComp: ReadingHeader,
  };
  return <Base headerState={headerState}></Base>;
};

export default Reading;
