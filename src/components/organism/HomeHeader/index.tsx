import React from "react";
import { View } from "react-native";
import { Amage, Button, Gap, TextItem } from "../..";
import { Bell } from "../../../../assets";
import { neutralColor, spacing as sp, strings } from "../../../constants";
import styles from "./styles";

const HomeHeader = ({ name, uri, onBellPress }: HomeHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Amage source={uri} />
      </View>
      <Gap horizontal={sp.xs} />
      <View style={styles.detailContainer}>
        <TextItem type="r.14.nc.80">{strings.happyReading}</TextItem>
        <TextItem type="b.24.nc.90.c">{name}</TextItem>
      </View>
      <Button style={styles.iconContainer} onPress={onBellPress}>
        <Bell stroke={neutralColor[90]} />
      </Button>
    </View>
  );
};

export default HomeHeader;
