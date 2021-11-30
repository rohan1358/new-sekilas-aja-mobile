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
  book: string;
  book_cover: string;
  kilas: string;
  available: boolean;
}

type Props = StackScreenProps<RootStackParamList, "Search">;

interface HomeProps extends Props {}
