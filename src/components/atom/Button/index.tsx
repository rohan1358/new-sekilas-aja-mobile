import React, { PropsWithChildren } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

const Button = ({
  children,
  activeOpacity = 0.8,
  ...props
}: PropsWithChildren<TouchableOpacityProps>) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
