import { Fire } from "@assets";
import { Button, Gap, TextItem } from "../../atom";
import { neutralColor, primaryColor, spacing as sp } from "@constants";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

const Chips = ({
  isSelected = false,
  onPress,
  id,
  label,
  Icon,
}: ChipsProps) => {
  const s = styles({ isSelected });
  return (
    <Button style={s.container} onPress={() => onPress(id)}>
      <TextItem type={`r.16.${isSelected ? "pc.main" : "nc.70"}.c`}>
        {label}
      </TextItem>
      <Gap horizontal={sp.xs} />
      <View style={s.icon}>
        <Icon stroke={isSelected ? primaryColor.main : neutralColor[70]} />
      </View>
    </Button>
  );
};

export default Chips;
