import { ArrowLeft } from "@assets";
import { Button } from "../../atom";
import { neutralColor, strings } from "@constants";
import React from "react";
import { View } from "react-native";
import { TextItem } from "../../atom";
import styles from "./styles";

export default function HeaderNotification({ navigation, title }: any) {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} style={styles.btnBack}>
        <ArrowLeft color={neutralColor[90]} />
      </Button>
      <TextItem type="b.20.nc.90">{title || strings.notification}</TextItem>
    </View>
  );
}
