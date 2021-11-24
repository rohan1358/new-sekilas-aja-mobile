import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

interface ProfileProps {
  firstName: string;
}

interface CompactBooksProps {
  id: string;
  book_title: string;
  author: string;
  read_time: number;
  book_cover: string | undefined;
}

interface ReadingBookProps {
  book_title: string;
  book_cover: string;
}

type Props = StackScreenProps<RootStackParamList, "Search">;

interface HomeProps extends Props {}
