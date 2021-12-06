import { ArrowLeft } from "@assets";
import { Gap, TextItem, Button } from "..";
import { neutralColor, spacing as sp } from "@constants";
import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { HeaderProps } from "./types";

const Header = ({ headerState }: HeaderProps) => {
  if (!headerState?.visible) {
    return null;
  }
  if (headerState?.type === "custom") {
    const CustomComp = headerState?.customComp;
    return (
      <View style={styles.customContainer}>
        <CustomComp />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Button style={styles.icon} onPress={headerState?.onBackPress}>
        <ArrowLeft stroke={neutralColor[90]} width={24} height={24} />
      </Button>
      <Gap horizontal={sp.xxs} />
      <TextItem type="b.20.nc.90.c">{headerState?.title}</TextItem>
    </View>
  );
};

export default Header;
