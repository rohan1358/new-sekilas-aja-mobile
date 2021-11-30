import { spacing as sp } from "../../spacing";
import { widthPercent } from "../../../helpers/helper";

const TITLE_WIDTH = widthPercent(100) - sp.sl * 2;
const TITLE_HEIGHT = 40;

const mainReading = [
  {
    key: "title1",
    width: TITLE_WIDTH,
    height: TITLE_HEIGHT,
    marginLeft: sp.sl,
    marginTop: sp.sl,
  },
  {
    key: "title2",
    width: TITLE_WIDTH,
    height: 160,
    marginLeft: sp.sl,
    marginTop: sp.sl,
  },
  {
    key: "title3",
    width: TITLE_WIDTH,
    height: 256,
    marginLeft: sp.sl,
    marginTop: sp.sl,
  },
];

export { mainReading };
