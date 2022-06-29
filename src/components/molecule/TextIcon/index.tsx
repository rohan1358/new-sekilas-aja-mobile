import { Button, Gap, TextItem } from "../../atom";
import { Search } from "@assets";
import React from "react";
import styles from "./styles";
import { neutralColor, neutralColorText, spacing as sp } from "@constants";
import { TextIconProps } from "./types";

const TextIcon = ({
  item,
  onPress,
  Icon = <Search stroke={neutralColorText[90]} />
}: TextIconProps) => {
  const onItemPress = () => onPress && onPress(item);
  return (
    <Button style={styles.container} onPress={onItemPress}>
      {Icon}
      <Gap horizontal={sp.sm} />
      <TextItem type="r.16.nc.90">{item.label}</TextItem>
    </Button>
  );
};

export default TextIcon;
