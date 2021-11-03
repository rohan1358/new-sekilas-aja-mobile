import React from "react";
import { TextInput, View } from "react-native";
import { defaultValue, spacing } from "../../../constants";
import { Gap, TextItem, Button } from "../../atom";
import styles from "./styles";
import { TextFieldProps } from "./types";

const { none } = defaultValue.textFieldState;

const TextField = ({
  message,
  state = none,
  Icon,
  iconPress,
  iconDisbabled = false,
  containerStyle,
  innerContainerStyle,
  noBottomGap = false,
  ...props
}: TextFieldProps) => {
  const s = styles({ state });
  return (
    <View style={containerStyle}>
      <View style={[s.container, innerContainerStyle]}>
        <TextInput style={s.input} {...props} />
        {Icon && (
          <Button
            onPress={iconPress}
            disabled={iconDisbabled}
            style={s.iconContainer}
          >
            {Icon}
          </Button>
        )}
        <Gap horizontal={spacing.xxs} />
      </View>
      {!noBottomGap && <Gap vertical={spacing.xs} />}
      {!!message && message.length !== 0 && (
        <TextItem type="r.14.dc.main">{message}</TextItem>
      )}
    </View>
  );
};

export default TextField;
