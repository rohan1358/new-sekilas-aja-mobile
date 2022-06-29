import React from "react";
import { View } from "react-native";
import TextItem from "../TextItem";
import styles from "./styles";

const Seed = ({ label, bg, textColor = "nc.100" }: SeedProps) => {
  const s = styles({ bg });
  return (
    <View style={s.seed}>
      <TextItem type={`m.10.${textColor}`}>{label}</TextItem>
    </View>
  );
};

export default Seed;
