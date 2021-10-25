import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { GapProps } from "./types";

const Gap = ({
  horizontal,
  vertical,
  children,
}: PropsWithChildren<GapProps>) => {
  return (
    <View
      style={[
        !!horizontal && {
          paddingHorizontal: horizontal / 2,
        },
        !!vertical && {
          paddingVertical: vertical / 2,
        },
      ]}
    >
      {children}
    </View>
  );
};

export default Gap;
