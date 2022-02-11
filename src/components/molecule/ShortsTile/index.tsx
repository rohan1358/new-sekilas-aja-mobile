import { AdaptiveText, Amage, Button, Gap, TextItem } from "@atom";
import { spacer } from "@constants";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

interface ShortsTileProps {
  index?: number;
  onPress(): void;
}

const ShortsTile = ({ index, onPress }: ShortsTileProps) => {
  return (
    <View style={styles.wrapper}>
      {index === 0 && <Gap horizontal={spacer.m} />}
      <Button style={styles.container} onPress={onPress}>
        <View style={styles.circle} />
        <View style={styles.smallCircle}>
          <AdaptiveText
            type="textBase/black"
            style={styles.title}
            numberOfLines={2}
          >
            The Psychology of Money
          </AdaptiveText>
          <Gap vertical={spacer.xs} />
          <Amage style={styles.image} />
        </View>
      </Button>

      <Gap horizontal={spacer.m} />
    </View>
  );
};

export default ShortsTile;
