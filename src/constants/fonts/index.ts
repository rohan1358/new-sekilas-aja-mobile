import { widthDp } from "@helpers";
import { NotoSans } from "../fontFamily";

const percentConverter = (fontSize: number, percent: number) =>
  (widthDp(fontSize) * percent) / 100;

type FontFamilyTypes = "black" | "bold" | "medium";

/**
 * @param fontFamily "black"
 * @returns `StyleProp<TextStyle>`
 */
const textBase = (fontFamily: FontFamilyTypes) => ({
  fontSize: widthDp(16),
  fontFamily: NotoSans[fontFamily],
  letterSpacing: percentConverter(16, -1),
  lineHeight: percentConverter(16, 140),
});

const text3xl = (fontFamily: FontFamilyTypes) => ({
  fontSize: widthDp(24),
  fontFamily: NotoSans[fontFamily],
  letterSpacing: percentConverter(24, -2),
  lineHeight: percentConverter(24, 120),
});

const textXs = (fontFamily: FontFamilyTypes) => ({
  fontSize: widthDp(12),
  fontFamily: NotoSans[fontFamily],
});

const fonts = { text3xl, textBase, textXs } as const;

export type { FontFamilyTypes };
export { text3xl, textBase, textXs };
export default fonts;
