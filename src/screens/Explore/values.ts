import { spacing as sp } from "@constants";
import { categories } from "assets/dummy";

const BOTTOM_HEADER_GAP = sp.sm;

const BOTTOM_NAV_HEIGHT = 64;

const BOUNDARY =
  categories.length % 2 === 0
    ? categories.length / 2
    : Math.ceil(categories.length / 2);

const FLATLIST_SECOND_GAP = sp.sl * 2;

const HORIZONTAL_GAP = sp.sl * 2;

const TOP_HEADER_GAP = sp.m;

export {
  BOUNDARY,
  HORIZONTAL_GAP,
  BOTTOM_HEADER_GAP,
  BOTTOM_NAV_HEIGHT,
  TOP_HEADER_GAP,
  FLATLIST_SECOND_GAP,
};
