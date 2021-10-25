import React from "react";
import { TextInput, View } from "react-native";
import { defaultValue, spacing } from "../../../constants";
import { Gap, TextItem } from "../../atom";
import styles from "./styles";
import { TextFieldProps } from "./types";

const { none } = defaultValue.textFieldState;

const TextField = ({
  message,
  state = none,
  Icon,
  ...props
}: TextFieldProps) => {
  const s = styles({ state });
  return (
    <View>
      <View style={s.container}>
        <TextInput style={s.input} {...props} />
        <View style={s.iconContainer}>{Icon && Icon}</View>
        <Gap horizontal={spacing.xxs} />
      </View>
      <Gap vertical={spacing.xs} />
      {!!message && message.length !== 0 && (
        <TextItem type="r.14.dc.main">{message}</TextItem>
      )}
    </View>
  );
};

export default TextField;
