import { ChevronRight, Download } from "@assets";
import { Button, Gap, Seed, TextItem } from "../../atom";
import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { neutralColor, spacing as sp } from "@constants";

const LibraryMenu = ({ title, bookCount, icon, action }: LibraryMenuProps) => {
  return (
    <Button onPress={() => action && action()} style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Gap horizontal={sp.xs} />
      <View style={styles.detail}>
        <TextItem type="b.16.nc.90" numberOfLines={1}>
          {title}
        </TextItem>
        <Seed label={`${bookCount || 0} Buku`} />
      </View>
      <ChevronRight stroke={neutralColor[50]} />
    </Button>
  );
};

export default LibraryMenu;
