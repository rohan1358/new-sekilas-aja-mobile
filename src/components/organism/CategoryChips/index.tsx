import { Gap } from "@atom";
import { spacing } from "@constants";
import { Chips } from "@molecule";
import { categories } from "../../../../assets/dummy";
import React from "react";
import { View } from "react-native";
import styles from "./styles";
const BOUNDARY =
  categories.length % 2 === 0
    ? categories.length / 2
    : Math.ceil(categories.length / 2);
const CategoryChips = ({
  item,
  index,
  onPress
}: {
  item: { id: string; label: string; Icon: any };
  index: number;
  onPress(arg0: string): void;
}) => (
  <View key={item.id} style={styles.row}>
    {index == 0 && <Gap horizontal={spacing.sl} />}
    <Chips label={item.label} id={item.id} Icon={item.Icon} onPress={onPress} />
    <Gap horizontal={index === BOUNDARY - 1 ? spacing.sl : spacing.xs} />
  </View>
);

export default CategoryChips;
