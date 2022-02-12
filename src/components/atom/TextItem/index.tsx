import React, { PropsWithChildren } from "react";
import { Text, PixelRatio } from "react-native";
import { adjust } from "../../../utils";
import {
  colors,
  dangerColor,
  fontFamily as ff,
  neutralColor,
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
      return "bold";
    case "i":
      return "italic";
    case "bi":
      return "boldItalic";

    default:
      return "regular";
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
  const fontFamily = ff[familyFinder(fontCode)];
  const fontSize = parseInt(adjust(size));
  // const fontSize = parseInt(pixelRatio > 2 ? size : size - 2);
  const textTransform = transformFinder(transform);
  return { fontFamily, fontSize, color, textTransform };
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
