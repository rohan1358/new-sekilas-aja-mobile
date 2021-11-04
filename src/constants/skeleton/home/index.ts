import { spacing as sp } from "../../spacing";
import { widthPercent } from "../../../helpers/helper";

const mainHome = [
  {
    key: "header",
    width: widthPercent(100),
    height: sp.xl * 3,
    marginBottom: sp.sl,
  },
  {
    key: "bannerTitle",
    width: widthPercent(80),
    height: 32,
    marginLeft: sp.sl,
    marginBottom: sp.sm,
  },
  {
    key: "banner",
    width: widthPercent(100) - sp.sl * 2,
    height: 160,
    marginLeft: sp.sl,
    marginBottom: sp.sl,
  },
  {
    key: "collectionTitle",
    width: widthPercent(80),
    height: 32,
    marginLeft: sp.sl,
    marginBottom: sp.xxs,
  },
  {
    key: "collectionDesc",
    width: widthPercent(80),
    height: 16,
    marginLeft: sp.sl,
    marginBottom: sp.sm,
  },
  {
    key: "collection",
    width: widthPercent(80) - sp.sl * 2,
    height: 68,
    marginLeft: sp.sl,
    marginBottom: sp.sm,
  },
  {
    key: "collection2",
    width: widthPercent(80) - sp.sl * 2,
    height: 68,
    marginLeft: sp.sl,
    marginBottom: sp.sl,
  },
  {
    key: "booksTitle",
    width: widthPercent(80),
    height: 32,
    marginLeft: sp.sl,
    marginBottom: sp.xxs,
  },
];

export { mainHome };
