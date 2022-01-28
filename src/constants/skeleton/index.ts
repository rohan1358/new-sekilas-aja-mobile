import { mainCategory } from "./category";
import { mainExplore } from "./explore";
import { mainHome } from "./home";
import { mainReading } from "./reading";
import { mainSearch } from "./search";
import { mainTableContent } from "./tableContent";
import {
  componentCategory,
  componentRecomended,
  componentBanner
} from "./component";
import { timer } from "./listening/timer";
export const skeleton = {
  mainCategory,
  mainExplore,
  mainHome,
  mainReading,
  mainSearch,
  mainTableContent,
  componentCategory,
  componentRecomended,
  componentBanner,
  componentMostRead: componentRecomended,
  listening: {
    timing: timer
  }
};
