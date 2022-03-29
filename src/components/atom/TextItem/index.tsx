import { widthDp } from "@helpers";
import React, { PropsWithChildren } from "react";
import { Text, PixelRatio } from "react-native";
import { adjust, adjustLetterSpace } from "../../../utils";
import {
  colors,
  dangerColor,
  fontFamily as ff,
  neutralColor,
  NotoSans,
  primaryColor
} from "../../../constants";
import { TextItemProps } from "./types";

const transformFinder = (code: string) => {
  switch (code) {
    case "u":
      return "uppercase";
    case "c":
      return "capitalize";
    case "l":
      return "lowercase";

    default:
      return "none";
  }
};

const familyFinder = (code: string) => {
  switch (code) {
    case "r":
      return "regular";
    case "b":
      return "black";
    case "i":
      return "italic";
    case "bi":
      return "boldItalic";
    case "bold":
      return "bold";

    default:
      return "regular";
  }
};

const letterSpacingFinder = (code: string) => {
  switch (code) {
    case "r":
      return 0.4;
    case "b":
      return 0.8;
    case "i":
      return 0.5;
    case "bi":
      return 0.7;
    case "bold":
      return 0.6;

    default:
      return 0;
  }
};

const colorFinder = (code: string) => {
  switch (code) {
    case "dc":
      return dangerColor;
    case "nc":
      return neutralColor;
    case "c":
      return colors;
    case "pc":
      return primaryColor;

    default:
      return colors;
  }
};

const styleGenerator = (code: string) => {
  if (!code) {
    return {};
  }
  const separated: Array<string> = code?.split(".");
  const [fontCode, size, colorScheme, colorCode, transform] = separated;

  //@ts-ignore
  const color = colorFinder(colorScheme)[colorCode];
  //@ts-ignore
  const fontFamily = NotoSans[familyFinder(fontCode)];
  const fontSize = widthDp(parseInt(adjust(size)));
  const textTransform = transformFinder(transform);
  return {
    fontFamily,
    fontSize,
    color,
    textTransform,
    letterSpacing: letterSpacingFinder(adjustLetterSpace(-0.8)) || 0
  };
};

const TextItem = ({
  style,
  children,
  type = "",
  ...props
}: PropsWithChildren<TextItemProps>) => {
  const textStyle = styleGenerator(type);
  return (
    <>
      {/* 
      // @ts-ignore */}
      <Text style={[textStyle, style]} {...props}>
        {children}
      </Text>
    </>
  );
};

export default TextItem;
