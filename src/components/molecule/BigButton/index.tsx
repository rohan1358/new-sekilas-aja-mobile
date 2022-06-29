import React from "react";
import { ActivityIndicator } from "react-native";
import {
  colorTextButton,
  neutralColorButton,
  neutralColorText,
  primaryColor
} from "../../../constants";
import { Button, TextItem } from "../../atom";
import styles from "./styles";
import { BigButtonProps } from "./types";

const BigButton = ({
  label,
  disabled = false,
  isLoading = false,
  ...props
}: BigButtonProps) => {
  const s = styles({ disabled });
  const textType = disabled ? "b.24.ncb.60" : "b.24.ncbtn.90";
  return (
    <Button style={s.container} disabled={disabled} {...props}>
      {isLoading ? (
        <ActivityIndicator color={colorTextButton[90]} size="large" />
      ) : (
        <TextItem type={textType}>{label}</TextItem>
      )}
    </Button>
  );
};

export default BigButton;
