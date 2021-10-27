import React from "react";
import { View } from "react-native";
import { Amage, Button, Gap, Seed, TextItem } from "../..";
import { spacing as sp } from "../../../constants";
import styles from "./styles";

const BookTile = ({ title, author, duration }: BookTileProps) => {
  return (
    <Button style={styles.container}>
      <View style={styles.imageContainer}>
        <Amage style={styles.image} />
      </View>
      <Gap vertical={sp.sm} />
      <View style={{ flex: 1 }}>
        <TextItem type="b.24.nc.90" numberOfLines={1}>
          {title}
        </TextItem>
        <TextItem type="r.14.nc.70" numberOfLines={1}>{`${author}`}</TextItem>
      </View>
      <Gap vertical={sp.sm} />
      <Seed label={`${duration} min`} />
    </Button>
  );
};

export default BookTile;
