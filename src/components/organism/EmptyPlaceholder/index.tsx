import { FirePaperIllu } from "@assets";
import React from "react";
import { View } from "react-native";
import { TextItem } from "../../atom";
import styles from "./styles";
import { ILLU_SIZE } from "./values";

const EmptyPlaceholder = ({ title, subtitle }: EmptyPlaceholderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FirePaperIllu width={ILLU_SIZE} height={ILLU_SIZE} />
      </View>
      <View style={styles.textContainer}>
        <TextItem type="b.24.nc.90" style={{ textAlign: "center" }}>
          {title}
        </TextItem>
        <TextItem type="r.14.nc.90" style={{ textAlign: "center" }}>
          {subtitle}
        </TextItem>
      </View>
    </View>
  );
};

export default EmptyPlaceholder;
