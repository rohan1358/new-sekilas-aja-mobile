import { spacing as sp } from "../../spacing";
import { widthPercent } from "../../../helpers/helper";
import {
  TILE_HEIGHT,
  TILE_WIDTH,
} from "../../../components/organism/BookTile/styles";

const mainExplore = [
  {
    key: "header",
    width: widthPercent(100),
    height: sp.xl * 3,
    marginBottom: sp.sl,
  },
  {
    key: "bannerTitle",
    width: widthPercent(40),
    height: 32,
    marginLeft: sp.sl,
    marginBottom: sp.sm,
  },
  {
    key: "banner",
    width: widthPercent(30),
    height: 24,
    marginLeft: sp.sl,
    marginBottom: sp.sm,
  },
  {
    key: "banner2",
    width: widthPercent(40),
    height: 24,
    marginLeft: sp.sl,
    marginBottom: sp.sl,
  },
  {
    key: "collectionTitle",
    width: widthPercent(80),
    height: 32,
    marginLeft: sp.sl,
    marginBottom: sp.m,
  },
  {
    key: "booktile",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    marginLeft: sp.sl,
  },
  {
    key: "booktile2",
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    marginLeft: sp.sl,
    top: -TILE_HEIGHT,
    left: TILE_WIDTH + sp.sm,
  },
];

export { mainExplore };
