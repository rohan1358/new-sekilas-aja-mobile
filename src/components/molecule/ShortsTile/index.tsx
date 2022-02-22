import { AdaptiveText, Amage, Button, Gap, TextItem } from "@atom";
import { spacer } from "@constants";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

interface ShortsTileProps {
  index?: number;
  onPress(arg0: string): void;
  title: string;
  cover: string;
}

const ShortsTile = ({ index, onPress, title, cover }: ShortsTileProps) => {
  return (
    <View style={styles.wrapper}>
      {index === 0 && <Gap horizontal={spacer.m} />}
      <Button style={styles.container} onPress={() => onPress(title)}>
        <View style={styles.circle} />
        <View style={styles.smallCircle}>
          <AdaptiveText
            type="textBase/black"
            style={styles.title}
            numberOfLines={2}
          >
            {title}
          </AdaptiveText>
          <Gap vertical={spacer.xs} />
          <Amage style={styles.image} source={cover} />
        </View>
      </Button>

      <Gap horizontal={spacer.m} />
    </View>
  );
};

export default ShortsTile;
