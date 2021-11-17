import { Button, Gap, TextItem } from "../../atom";
import { Search } from "@assets";
import React from "react";
import styles from "./styles";
import { neutralColor, spacing as sp } from "@constants";

const TextIcon = ({ item, onPress }: TextIconProps) => {
  const onItemPress = () => onPress(item);
  return (
    <Button style={styles.container} onPress={onItemPress}>
      <Search stroke={neutralColor[70]} />
      <Gap horizontal={sp.sm} />
      <TextItem type="r.16.nc.90">{item.label}</TextItem>
    </Button>
  );
};

export default TextIcon;
