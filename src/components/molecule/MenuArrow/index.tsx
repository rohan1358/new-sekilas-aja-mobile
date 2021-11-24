import { ChevronRight } from "@assets";
import { Button, TextItem } from "@components";
import { neutralColor } from "@constants";
import React from "react";
import styles from "./styles";

const MenuArrow = ({ title, index }: MenuArrowProps) => (
  <Button style={styles.container}>
    <TextItem type="r.16.nc.90">{`${index}. ${title}`}</TextItem>
    <ChevronRight color={neutralColor[50]} />
  </Button>
);

export default MenuArrow;
