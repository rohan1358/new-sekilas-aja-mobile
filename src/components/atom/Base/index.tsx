import React, { PropsWithChildren } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { neutralColor, snackState as ss } from "../../../constants";
import Header from "../Header";
import styles from "./styles";
import { Snackbar } from "react-native-paper";
import { BaseProps } from "./types";

const Base = ({
  children,
  snackState,
  setSnackState,
  barColor = neutralColor[10],
  barStyle = "dark-content",
  backgroundColor = neutralColor[10],
  headerState,
  fullScreen
}: PropsWithChildren<BaseProps>) => {
  const s = styles({ snackType: snackState?.type, backgroundColor });
  return (
    <>
      {fullScreen ? (
        <>{children}</>
      ) : (
        <GestureHandlerRootView style={s.container}>
          <StatusBar backgroundColor={barColor} barStyle={barStyle} />
          <Header headerState={headerState} />
          {children}
          <Snackbar
            visible={snackState?.visible || false}
            onDismiss={() => setSnackState && setSnackState(ss.closeState)}
            style={s.snack}
            // duration={1000}
          >
            {snackState?.message}
          </Snackbar>
        </GestureHandlerRootView>
      )}
    </>
  );
};

export default Base;
