import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { BookTableOfContentProps } from "../BookTableContent/types";

type Props = StackScreenProps<RootStackParamList, "Reading">;

interface ReadingProps extends Props {}

interface PageContentProps extends BookTableOfContentProps {
  details: string[];
}
interface BookContentProps {
  numberOfPage: number;
  pageContent: PageContentProps[];
}
