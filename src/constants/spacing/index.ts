import { widthDp } from "@helpers";

const converter = (value: number) => widthDp(value);

const spacer = {
  xxs: converter(4),
  xs: converter(8),
  s: converter(12),
  sm: converter(16),
  m: converter(24),
  sl: converter(32),
  l: converter(40),
  xl: converter(48),
  xxl: converter(64)
};

// const spacing = {
//   xxs: 4,
//   xs: 8,
//   s: 12,
//   sm: 16,
//   m: 24,
//   sl: 32,
//   l: 40,
//   xl: 48,
//   xxl: 64,
// };

const spacing = { ...spacer };

export { spacing, spacer };
