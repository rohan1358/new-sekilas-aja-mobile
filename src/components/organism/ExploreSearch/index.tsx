import { Camera, CloseX, Search } from "@assets";
import { neutralColor, primaryColor, strings } from "@constants";
import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Button } from "../../atom";
import { TextField } from "../../molecule";
import styles from "./styles";
import { ExploreSesarchProps } from "./types";

const ExploreSearch = ({
  onChangeText,
  closePress,
  cameraPress,
  position,
  keyword,
}: ExploreSesarchProps) => {
  const cameraStyle = useAnimatedStyle(() => ({
    left: position.value,
  }));

  const closeStyle = useAnimatedStyle(() => {
    const opacity =
      !!keyword && keyword.length > 2 ? 1 : withDelay(400, withTiming(0));
    return { opacity };
  });
  return (
    <View style={styles.boxesContainer}>
      <View style={styles.iconContainer}>
        <Search stroke={neutralColor[90]} />
      </View>
      <TextField
        placeholder={strings.findFavBookPlaceholder}
        containerStyle={styles.inputContainerStyle}
        noBottomGap
        innerContainerStyle={styles.inputInnerContainerStyle}
        inputStyle={styles.inputStyle}
        onChangeText={onChangeText}
      />
      <View style={styles.boxes}>
        <Animated.View style={closeStyle}>
          <Button onPress={closePress} style={styles.iconContainer}>
            <CloseX stroke={neutralColor[100]} />
          </Button>
        </Animated.View>
        <Animated.View style={cameraStyle}>
          <Button
            onPress={cameraPress}
            style={[styles.iconContainer, styles.primaryIcon]}
          >
            <Camera stroke={primaryColor.main} />
          </Button>
        </Animated.View>
      </View>
    </View>
  );
};

export default ExploreSearch;
