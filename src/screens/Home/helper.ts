import { dummyCollection } from "./dummy";

const dummyMiniCollectionData = dummyCollection.map((item, index, value) => {
  if (index % 2 !== 0) {
    return;
  }
  return [item, value[index + 1]];
});

const pageParser = (kilas: string) => `${parseInt(kilas || "1") - 1}`;

export { dummyMiniCollectionData, pageParser };
