interface FetchResponse {
  data: any;
  message: string;
  isSuccess: boolean;
  error: any;
}

interface BookResponse {
  book_title: string;
  author: string;
  read_time: number | null;
  id: string;
  book_cover: string;
  isVideoAvailable: boolean;
}
