import React from "react";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import fonts, { FontFamilyTypes } from "../../../constants/fonts";

type AdapativeTextTypes =
  | "text3xl/black"
  | "textBase/black"
  | "textBase/bold"
  | "textXs/medium";

type AdaptiveFamilyTypes = "text3xl" | "textBase" | "textXs";

interface AdaptiveTextProps extends TextProps {
  type?: AdapativeTextTypes;
  textColor?: string;
}

const adaptiveStyleGenerator = (obj: TextStyle): TextStyle =>
  StyleSheet.create({ obj }).obj;

const styleSelector = (textType: AdapativeTextTypes) => {
  const raw: string[] = textType?.split("/");
  const extractedType: [AdaptiveFamilyTypes, FontFamilyTypes] = [
    //@ts-ignore
    raw[0],
    //@ts-ignore
    raw[1],
  ];
  return adaptiveStyleGenerator(fonts[extractedType[0]](extractedType[1]));
};

const AdaptiveText = ({
  textColor,
  type = "text3xl/black",
  children,
  style,
  ...props
}: PropsWithChildren<AdaptiveTextProps>) => {
  const formulatedStyle: TextStyle = styleSelector(type);
  return (
    <Text {...props} style={[{ color: textColor }, style, formulatedStyle]}>
      {children}
    </Text>
  );
};

export default AdaptiveText;
