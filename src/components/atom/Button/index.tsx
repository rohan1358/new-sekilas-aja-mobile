import React, { PropsWithChildren } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

const Button = ({
  children,
  ...props
}: PropsWithChildren<TouchableOpacityProps>) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.8}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
