import { ArrowLeft } from "@assets";
import { neutralColor } from "@constants";
import React from "react";
import { View } from "react-native";
import { Button, TextItem } from "../../atom";
import styles from "./styles";

export default function AboutHeader({ title, navigation }: AboutHeaderProps) {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} style={styles.btnBack}>
        <ArrowLeft color={neutralColor[90]} />
      </Button>
      <TextItem style={styles.title}>{title}</TextItem>
    </View>
  );
}
