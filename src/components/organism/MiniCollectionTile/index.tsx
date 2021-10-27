import React from "react";
import { View } from "react-native";
import { Amage, Gap, Seed, TextItem } from "../..";
import { spacing as sp } from "../../../constants";
import styles from "./styles";

const MiniCollectionTile = ({
  title,
  subtitle,
  bookCount,
}: MiniCollectionTileProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Amage style={styles.image} />
      </View>
      <Gap horizontal={sp.xs} />
      <View style={styles.detail}>
        <TextItem type="b.16.nc.90" numberOfLines={1}>
          {title}
        </TextItem>
        <TextItem type="r.12.nc.70" numberOfLines={1}>
          {subtitle}
        </TextItem>
        <Seed label={`${bookCount} buku`} />
      </View>
    </View>
  );
};

export default MiniCollectionTile;
