import { ArrowLeft, MenuDots } from "@assets";
import { neutralColor, spacing as sp } from "@constants";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Button, Gap, TextItem } from "../../atom";
import { ButtonIcon } from "../../molecule";
import styles from "./styles";

const ReadingHeader = ({
  title,
  backPress,
  dotPress,
  dotVisibility,
}: ReadingHeaderProps) => {
  const [textWidth, setTextWidth] = useState(1000);
  const [actualHeaderWidth, setActualHeaderWidth] = useState<number>(0);

  const s = styles({ textWidth, dotVisibility });

  const translate = useMemo(
    () => actualHeaderWidth - textWidth - 16,
    [actualHeaderWidth, textWidth]
  );

  const position = useSharedValue(0);

  const textStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const animate = () => {
    if (translate > 0) {
      return;
    }
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
    <View style={s.container}>
      <Gap horizontal={20} />
      <ButtonIcon onPress={backPress}>
        <ArrowLeft stroke={neutralColor[70]} width={24} height={24} />
      </ButtonIcon>
      <View
        style={s.wrapper}
        onLayout={(e) => setActualHeaderWidth(e.nativeEvent.layout.width)}
      >
        <Button style={s.titleWrapper} onPress={() => animate()}>
          <Animated.View style={textStyle}>
            <TextItem
              type="r.20.nc.90"
              onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
              style={{ alignSelf: "flex-start" }}
            >
              {title}
            </TextItem>
          </Animated.View>
        </Button>
        {/* <View style={[s.semiBlur, s.blurLeft]} /> */}
        <View style={[s.semiBlur, s.blurRight]} />
      </View>
      <Gap horizontal={sp.sm} />
      <ButtonIcon onPress={dotPress} disabled={!dotVisibility} style={s.dot}>
        <MenuDots stroke={neutralColor[70]} width={24} height={24} />
      </ButtonIcon>
      <Gap horizontal={20} />
    </View>
  );
};

export default ReadingHeader;
