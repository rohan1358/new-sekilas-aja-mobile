import { Button } from "../../atom";
import React, { PropsWithChildren } from "react";
import { TouchableOpacityProps } from "react-native";
import styles from "./styles";

const ButtonIcon = ({
  children,
  ...props
}: PropsWithChildren<TouchableOpacityProps>) => {
  return (
    <Button style={styles.container} {...props}>
      {children}
    </Button>
  );
};

export default ButtonIcon;
