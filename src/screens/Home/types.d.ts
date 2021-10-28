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
