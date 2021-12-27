import React, { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

const DuoRender = ({
  isRenderMain,
  children,
  falseComponent,
  style,
}: PropsWithChildren<{
  isRenderMain: boolean;
  falseComponent: React.ReactElement;
  style?: StyleProp<ViewStyle>;
}>) => {
  return <View style={style}>{isRenderMain ? children : falseComponent}</View>;
};

export default DuoRender;
