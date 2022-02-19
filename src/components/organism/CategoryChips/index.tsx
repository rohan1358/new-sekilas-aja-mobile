import { Gap } from "@atom";
import { primaryColor, spacing } from "@constants";
import { Chips } from "@molecule";
import { categories } from "../../../../assets/dummy";
import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";
const BOUNDARY =
  categories.length % 2 === 0
    ? categories.length / 2
    : Math.ceil(categories.length / 2);
const CategoryChips = ({
  item,
  index,
  onPress,
}: {
  item: { id: string; label: string; Icon: any };
  index: number;
  onPress(arg0: string): void;
}) => {
  const isFocus = useIsFocused();
  return (
    <View key={item.id} style={styles.row}>
      {index == 0 && <Gap horizontal={spacing.sl} />}
      {isFocus ? (
        <></>
      ) : (
        // <Chips
        //   label={item.label}
        //   id={item.id}
        //   Icon={item.Icon}
        //   onPress={onPress}
        // />
        <ActivityIndicator color={primaryColor.main} />
      )}
      <Gap horizontal={index === BOUNDARY - 1 ? spacing.sl : spacing.xs} />
    </View>
  );
};

export default CategoryChips;
