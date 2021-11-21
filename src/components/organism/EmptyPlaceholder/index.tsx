import { TextItem } from "../../atom";
import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { FirePaperIllu } from "@assets";
import { widthPercent } from "../../../helpers/helper";

const ILLU_SIZE = widthPercent(80);

const EmptyPlaceholder = ({ title, subtitle }: EmptyPlaceholderProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: ILLU_SIZE,
          height: ILLU_SIZE,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FirePaperIllu width={ILLU_SIZE} height={ILLU_SIZE} />
      </View>
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
