const { adjust } = require("../../src/utils");

const fontSize = {
  textXs: { fontSize: adjust(12), lineHeight: adjust(16) },
  text3xl: {
    fontSize: adjust(30),
    lineHeight: adjust(36)
  }
};
export { fontSize };
