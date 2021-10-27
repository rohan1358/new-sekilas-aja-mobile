import React from "react";
import { View } from "react-native";
import { Amage, Gap, Seed, TextItem } from "../..";
import { spacing as sp } from "../../../constants";
import styles from "./styles";

const BookTile = ({ title, author, duration }: BookTileProps) => {
  return (
    <View>
      <View style={styles.imageContainer}>
        <Amage style={styles.image} />
      </View>
      <Gap vertical={sp.sm} />
      <TextItem type="b.24.nc.90">{title}</TextItem>
      <TextItem type="r.14.nc.70">{`${author}`}</TextItem>
      <Gap vertical={sp.sm} />
      <Seed label={`${duration} min`} />
    </View>
  );
};

export default BookTile;
