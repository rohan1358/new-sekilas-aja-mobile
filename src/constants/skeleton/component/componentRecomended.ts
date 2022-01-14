import { spacing as sp } from "../../spacing";
import { widthPercent } from "../../../helpers";

const TILE_WIDTH = widthPercent(38.92);
const TILE_HEIGHT = (TILE_WIDTH * 11) / 10;

const componentRecomended = [
  {
    key: "booktile",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    marginLeft: sp.sl,
    marginTop: sp.sl
  },
  {
    key: "booktile2",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    marginLeft: sp.sl,
    top: -TILE_HEIGHT,
    left: TILE_WIDTH + sp.sm
  }
];

export default componentRecomended;
