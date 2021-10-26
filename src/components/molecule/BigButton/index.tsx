import React from "react";
import { Button, TextItem } from "../../atom";
import styles from "./styles";
import { BigButtonProps } from "./types";

const BigButton = ({ label, disabled = false, ...props }: BigButtonProps) => {
  const s = styles({ disabled });
  const textType = disabled ? "b.24.nc.60" : "b.24.pc.main";
  return (
    <Button style={s.container} disabled={disabled} {...props}>
      <TextItem type={textType}>{label}</TextItem>
    </Button>
  );
};

export default BigButton;
