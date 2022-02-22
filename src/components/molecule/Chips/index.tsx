import { neutralColor, primaryColor, spacing as sp } from "@constants";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from "react-native-reanimated";
import { checkData } from "../../../utils";
import { Button, Gap, TextItem } from "../../atom";
import styles from "./styles";

const Chips = ({
  isSelected = false,
  onPress,
  id,
  label,
  Icon
}: ChipsProps) => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const s = styles({ isSelected });

  const animate = () => {
    if (!isSelected) {
      return;
    }
    scale.value = withRepeat(withTiming(1.25), 2, true);
    rotate.value = withSequence(withTiming(-20), withTiming(20), withTiming(0));
  };

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }]
  }));

  useEffect(() => {
    animate();
  }, [isSelected]);

  return (
    <Button style={s.container} onPress={() => onPress(id)}>
      <TextItem type={`r.16.${isSelected ? "pc.main" : "nc.70"}.c`}>
        {label}
      </TextItem>
      <Gap horizontal={sp.xs} />
      {!!Icon && (
        <Animated.View style={[s.icon, iconStyle]}>
          <Icon stroke={isSelected ? primaryColor.main : neutralColor[70]} />
        </Animated.View>
      )}
    </Button>
  );
};

export default Chips;
