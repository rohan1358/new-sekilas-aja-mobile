import { Camera, Search } from "@assets";
import {
  neutralColor,
  neutralColorText,
  primaryColor,
  strings
} from "@constants";
import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { Button, TextItem } from "../../atom";
import styles from "./styles";
import { ExploreSesarchProps } from "./types";

const ExploreSearch = ({ cameraPress, onPress }: ExploreSesarchProps) => {
  return (
    <Button style={styles.boxesContainer} onPress={onPress}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: neutralColor[10]
          }
        ]}
      >
        <Search stroke={neutralColorText[90]} />
      </View>
      <View
        style={[
          styles.input,
          {
            backgroundColor: neutralColor[10]
          }
        ]}
      >
        <TextItem type="r.14.nc.70">{strings.findFavBookPlaceholder}</TextItem>
      </View>
      {/* <Button
        onPress={cameraPress}
        style={[styles.iconContainer, styles.primaryIcon]}
      >
        <Camera stroke={primaryColor.main} />
      </Button> */}
    </Button>
  );
};

export default ExploreSearch;
