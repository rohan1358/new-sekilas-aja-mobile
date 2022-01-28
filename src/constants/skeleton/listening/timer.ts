import { spacing as sp } from "../../spacing";
import { widthPercent } from "../../../helpers";

const TITLE_WIDTH = widthPercent(100) - sp.sl * 2;
const TITLE_HEIGHT = 40;

const timer = [
  {
    flexDirection: "row",
    marginRight: 10,
    width: "100%",
    children: [
      {
        key: "start",
        width: 30,
        height: 15,
        left: 0,
        position: "absolute"
      },
      {
        key: "end",
        width: 30,
        height: 15,
        right: 0,
        position: "absolute"
      }
    ]
  }
];

export { timer };
