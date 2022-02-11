import { Amage, Button, Gap, TextItem } from "@atom";
import { spacer } from "@constants";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

interface ShortsTileProps {
  index?: number;
}

const ShortsTile = ({ index }: ShortsTileProps) => {
  return (
    <View style={styles.wrapper}>
      {index === 0 && <Gap horizontal={spacer.m} />}
      <Button style={styles.container}>
        <View style={styles.circle} />
        <View style={styles.smallCircle}>
          <TextItem type="b.16.nc.90" style={styles.title} numberOfLines={2}>
            The Psychology of Money
          </TextItem>
          <Gap vertical={spacer.xs} />
          <Amage style={styles.image} />
        </View>
      </Button>

      <Gap horizontal={spacer.m} />
    </View>
  );
};

export default ShortsTile;
