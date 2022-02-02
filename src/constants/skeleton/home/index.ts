import { spacing as sp } from "../../spacing";
import { widthPercent } from "../../../helpers";

const mainHome = [
  {
    key: "header",
    width: widthPercent(100),
    height: sp.xl * 3,
    marginBottom: sp.sl
  },
  {
    key: "bannerTitle",
    width: widthPercent(80),
    height: 32,
    marginLeft: sp.sl,
    marginBottom: sp.sm
  },
  {
    key: "banner",
    width: widthPercent(100) - sp.sl * 2,
    height: 160,
    marginLeft: sp.sl,
    marginBottom: sp.sl
  },
  {
    flexDirection: "row",
    marginRight: 10,
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
    children: [
      {
        key: "start",
        width: "40%",
        height: 50,
        left: 0,
        margin: 5
      },
      {
        key: "end",
        width: "40%",
        height: 50,
        right: 0,
        margin: 5
      }
    ]
  },
  {
    key: "collectionTitle",
    width: widthPercent(80),
    height: 32,
    marginLeft: sp.sl,
    marginBottom: sp.xxs
  },
  {
    key: "collectionDesc",
    width: widthPercent(80),
    height: 16,
    marginLeft: sp.sl,
    marginBottom: sp.sm
  },

  {
    key: "collection",
    width: widthPercent(80) - sp.sl * 2,
    height: 68,
    marginLeft: sp.sl,
    marginBottom: sp.sm
  },
  {
    key: "collection2",
    width: widthPercent(80) - sp.sl * 2,
    height: 68,
    marginLeft: sp.sl,
    marginBottom: sp.sl
  },
  {
    key: "booksTitle",
    width: widthPercent(80),
    height: 32,
    marginLeft: sp.sl,
    marginBottom: sp.xxs
  }
];

export { mainHome };
