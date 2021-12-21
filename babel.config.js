module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {
      plugins: ["react-native-paper/babel"],
    },
  },
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@assets": "./assets/index.ts",
          "@components": "./src/components/index.ts",
          "@atom": "./src/components/atom/index.ts",
          "@helpers": "./src/helpers/index.ts",
          "@molecule": "./src/components/molecule/index.ts",
          "@organism": "./src/components/organism/index.ts",
          "@constants": "./src/constants/index.ts",
          "@rux": "./src/redux/reducers/index.ts",
        },
      },
    ],
    "react-native-reanimated/plugin", // reanimated should be last
  ],
};
