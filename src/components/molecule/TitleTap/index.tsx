import { TextItem, Gap, Button } from "../../atom";
import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { strings } from "@constants";

const TitleTap = ({ title, onPress }: { title: string; onPress?(): void }) => {
  return (
    <View style={styles.clickTitle}>
      <TextItem type="b.24.nc.90" style={styles.title}>
        {title}
      </TextItem>
      <Gap horizontal={20} />
      <Button onPress={onPress}>
        <TextItem type="b.14.nc.90" style={styles.underline}>
          {strings.seeAll}
        </TextItem>
      </Button>
    </View>
  );
};

export default TitleTap;
