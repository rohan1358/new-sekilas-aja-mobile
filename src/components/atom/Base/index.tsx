import React, { PropsWithChildren } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { neutralColor, snackState as ss } from "../../../constants";
import styles from "./styles";
import { Snackbar } from "react-native-paper";

const Base = ({
  children,
  snackState,
  setSnackState,
  barColor = neutralColor[10],
  barStyle = "dark-content",
}: PropsWithChildren<BaseProps>) => {
  const s = styles({ snackType: snackState?.type });
  return (
    <GestureHandlerRootView style={s.container}>
      <StatusBar backgroundColor={barColor} barStyle={barStyle} />
      {children}
      <Snackbar
        visible={snackState?.visible || false}
        onDismiss={() => setSnackState && setSnackState(ss.closeState)}
        style={s.snack}
        duration={2000}
      >
        {snackState?.message}
      </Snackbar>
    </GestureHandlerRootView>
  );
};

export default Base;