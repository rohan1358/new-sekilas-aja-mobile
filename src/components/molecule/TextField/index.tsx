import React, { forwardRef } from "react";
import { TextInput, View } from "react-native";
import { defaultValue, spacing } from "../../../constants";
import { Gap, TextItem, Button } from "../../atom";
import styles from "./styles";
import { TextFieldProps } from "./types";

const { none } = defaultValue.textFieldState;

const TextField = forwardRef(
  (
    {
      containerStyle,
      Icon,
      iconDisbabled = false,
      iconPress,
      innerContainerStyle,
      message,
      noBottomGap = false,
      state = none,
      inputStyle,
      ...props
    }: TextFieldProps,
    ref: any
  ) => {
    const s = styles({ state });
    return (
      <View style={containerStyle}>
        <View style={[s.container, innerContainerStyle]}>
          <TextInput style={[s.input, inputStyle]} {...props} ref={ref} />
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
  }
);

export default TextField;
