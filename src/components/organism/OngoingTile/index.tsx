import React, { useState } from "react";
import { View } from "react-native";
import { Amage, TextItem, Button, Gap } from "../../atom";
import { spacing, strings } from "../../../constants";
import styles from "./styles";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/reducers";
import { logger } from "../../../helpers";

const OngoingTile = ({
  bookTitle = "",
  bookUri,
  onPress,
  isAvailable,
}: OngoingTileProps) => {
  const {
    editProfile: { is_subscribed },
  } = useSelector((state: ReduxState) => state);
  const [tileHeight, setTileHeight] = useState<number>(74);
  const s = styles({ tileHeight, is_subscribed });
  return (
    <Button
      style={s.container}
      onPress={onPress}
      activeOpacity={0.9}
      disabled={!is_subscribed}
    >
      <View
        style={s.child}
        onLayout={(event) => setTileHeight(event.nativeEvent.layout.height)}
      >
        <View style={{ flex: 1 }}>
          <TextItem type="r.14.nc.70">
            {isAvailable ? strings.continueReading : strings.lastReadClue}
          </TextItem>
          <TextItem numberOfLines={1} type="b.20.nc.90">
            {isAvailable ? bookTitle : strings.pursueRead}
          </TextItem>
        </View>
        <Gap horizontal={spacing.sl} />
        {isAvailable && (
          <View style={s.imageContainer}>
            <Amage source={bookUri} />
          </View>
        )}
      </View>
    </Button>
  );
};

export default OngoingTile;
