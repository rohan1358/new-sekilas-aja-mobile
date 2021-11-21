import {
  BabyBottle,
  BankBuilding,
  ChatBubble,
  Clipboard,
  ComputerRobot,
  Cross,
  Crown,
  Fire,
  GiveHeart,
  Graph,
  GraphBar,
  Heart,
  HeartRate,
  HumanHead,
  PaintPalette,
  SearchDollar,
  Suitcase,
  Tree,
  YinYang,
} from "@assets";

import { flatCategories } from "../flatCategories";

const categories = [
  {
    id: "produktifitas",
    label: "Produktifitas",
    Icon: Fire,
  },
  {
    id: "karir & sukses",
    label: "Karir & Sukses",
    Icon: Clipboard,
  },
  {
    id: "skill komunikasi",
    label: "skill komunikasi",
    Icon: ChatBubble,
  },
  {
    id: "marketing",
    label: "marketing",
    Icon: SearchDollar,
  },
  {
    id: "keuangan & investasi",
    label: "keuangan & investasi",
    Icon: BankBuilding,
  },
  {
    id: "gaya hidup",
    label: "gaya hidup",
    Icon: HumanHead,
  },
  {
    id: flatCategories[5],
    label: "kesehatan & fitnes",
    Icon: HeartRate,
  },
  {
    id: "parenting",
    label: "parenting",
    Icon: BabyBottle,
  },
  {
    id: "isu sosial & sejarah",
    label: "isu sosial & sejarah",
    Icon: Crown,
  },
  {
    id: "alam & filosofi",
    label: "alam & filosofi",
    Icon: Tree,
  },
  {
    id: flatCategories[1],
    label: "pengembangan diri",
    Icon: GraphBar,
  },
  {
    id: flatCategories[3],
    label: "bisnis",
    Icon: Graph,
  },
  {
    id: "kepemimpinan & entrepreneurship",
    label: "kepemimpinan & entrepreneurship",
    Icon: Suitcase,
  },
  {
    id: "teknologi & sains",
    label: "teknologi & sains",
    Icon: ComputerRobot,
  },
  {
    id: "seni & desain",
    label: "seni & desain",
    Icon: PaintPalette,
  },
  {
    id: "percintaan",
    label: "percintaan",
    Icon: GiveHeart,
  },
  {
    id: "edukasi seks",
    label: "edukasi seks",
    Icon: Heart,
  },
  {
    id: "budaya & makanan",
    label: "budaya & makanan",
    Icon: YinYang,
  },
  {
    id: "agama & spiritual",
    label: "agama & spiritual",
    Icon: Cross,
  },
];

export { categories };
