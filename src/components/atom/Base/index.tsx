import React, { PropsWithChildren } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { neutralColor } from "../../../constants";
import styles from "./styles";

const Base = ({ children }: PropsWithChildren<any>) => {
  const s = styles();
  return (
    <GestureHandlerRootView style={s.container}>
      <StatusBar backgroundColor={neutralColor[10]} barStyle="dark-content" />
      {children}
    </GestureHandlerRootView>
  );
};

export default Base;
