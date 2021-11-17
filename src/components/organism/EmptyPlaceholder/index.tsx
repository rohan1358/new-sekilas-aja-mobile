import { TextItem } from "../../atom";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

const EmptyPlaceholder = ({ title, subtitle }: EmptyPlaceholderProps) => {
  return (
    <View style={styles.container}>
      <TextItem type="b.24.nc.90" style={{ textAlign: "center" }}>
        {title}
      </TextItem>
      <TextItem type="r.14.nc.90" style={{ textAlign: "center" }}>
        {subtitle}
      </TextItem>
    </View>
  );
};

export default EmptyPlaceholder;
