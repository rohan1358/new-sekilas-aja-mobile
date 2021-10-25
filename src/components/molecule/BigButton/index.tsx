import React from "react";
import { Button, TextItem } from "../../atom";
import styles from "./styles";
import { BigButtonProps } from "./types";

const BigButton = ({ label }: BigButtonProps) => {
  return (
    <Button style={styles.container}>
      <TextItem type="b.24.pc.main">{label}</TextItem>
    </Button>
  );
};

export default BigButton;
