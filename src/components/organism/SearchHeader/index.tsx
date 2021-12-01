import { ArrowLeft, CloseX, Search } from "@assets";
import { neutralColor, strings } from "@constants";
import React, { forwardRef, useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Button } from "../../atom";
import { TextField } from "../../molecule";
import styles from "./styles";
import { SearchHeaderProps } from "./types";

const X_INITIAL = 56;

const SearchHeader = forwardRef<any, SearchHeaderProps>(
  ({ keyword, closePress, backPress, ...props }, ref) => {
    const xPosition = useSharedValue(X_INITIAL);

    const closeStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: xPosition.value }],
    }));

    const animateClose = () =>
      (xPosition.value =
        !!keyword && keyword?.length > 2
          ? withTiming(0)
          : withTiming(X_INITIAL));

    useEffect(() => {
      animateClose();
    }, [keyword]);

    return (
      <View style={styles.container}>
        <Button
          style={[styles.iconContainer, styles.primaryIcon]}
          onPress={backPress}
        >
          <ArrowLeft stroke={neutralColor[90]} width={24} height={24} />
        </Button>
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
            ref={ref}
            defaultValue={keyword}
            {...props}
          />
          <View style={styles.iconContainer}>
            <Animated.View style={closeStyle}>
              <Button onPress={closePress}>
                <CloseX stroke={neutralColor[90]} />
              </Button>
            </Animated.View>
          </View>
        </View>
      </View>
    );
  }
);

export default SearchHeader;