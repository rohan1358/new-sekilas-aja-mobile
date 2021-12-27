interface BookContentProps {
  numberOfPage: number;
  pageContent: PageContentProps[];
}

interface BookTableOfContentProps {
  id: string;
  title: string;
  kilas: string;
}

interface CompactBooksProps {
  id: string;
  book_title: string;
  author: string;
  read_time: number;
  book_cover: string | undefined;
  isVideoAvailable: boolean;
}
interface PageContentProps extends BookTableOfContentProps {
  details: string[];
}

interface ReadingBookProps {
  book: string;
  book_cover: string;
  kilas: string;
  available: boolean;
}
