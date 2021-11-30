import { ChevronRight } from "@assets";
import { Button, Gap, TextItem } from "../../atom";
import { neutralColor, spacing as sp } from "@constants";
import React from "react";
import styles from "./styles";

const MenuArrow = ({ title, index, onPress }: MenuArrowProps) => (
  <Button style={styles.container} onPress={onPress}>
    <TextItem
      type="r.16.nc.90"
      style={styles.text}
    >{`${index}. ${title}`}</TextItem>
    <Gap horizontal={sp.sm} />
    <ChevronRight color={neutralColor[50]} />
  </Button>
);

export default MenuArrow;
