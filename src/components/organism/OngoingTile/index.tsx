import React, { useState } from "react";
import { View } from "react-native";
import { Amage, TextItem } from "../../atom";
import { strings } from "../../../constants";
import styles from "./styles";

const OngoingTile = ({ bookTitle = "", bookUri }: OngoingTileProps) => {
  const [tileHeight, setTileHeight] = useState<number>(74);
  const s = styles({ tileHeight });
  return (
    <View style={s.container}>
      <View
        style={s.child}
        onLayout={(event) => setTileHeight(event.nativeEvent.layout.height)}
      >
        <View>
          <TextItem type="r.14.nc.70">{strings.continueReading}</TextItem>
          <TextItem numberOfLines={1} type="b.20.nc.90">
            {bookTitle}
          </TextItem>
        </View>
        <View style={s.imageContainer}>
          <Amage source={bookUri} />
        </View>
      </View>
    </View>
  );
};

export default OngoingTile;