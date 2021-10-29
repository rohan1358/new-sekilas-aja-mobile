import React from "react";
import { View } from "react-native";
import TextItem from "../TextItem";
import styles from "./styles";

const Seed = ({ label }: SeedProps) => {
  return (
    <View style={styles.seed}>
      <TextItem type="r.10.nc.100">{label}</TextItem>
    </View>
  );
};

export default Seed;
