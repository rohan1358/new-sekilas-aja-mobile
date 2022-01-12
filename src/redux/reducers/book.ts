import { EMAIL, NAMA, PASSWORD, PROFILE } from "../actionTypes";
import {
  SET_BOOK_RECOMENDED,
  SET_MOST_READ_BOOK,
  SET_LIST_CATEGORY
} from "../actionTypes/book";
import { bookRecomendedStorage, mostBookStorage } from "../store";

interface IProfile {
  owned_books: string[];
  id: string;
}

interface initialStateItf {
  nama: string;
  email: string;
  password: string;
  profile: IProfile | null;
  bookRecomended: any;
  mostReadBook: any;
  listCategory: any;
}

const inisialState: initialStateItf = {
  nama: "",
  email: "",
  password: "",
  profile: null,
  bookRecomended: async () => await bookRecomendedStorage.get(),
  mostReadBook: async () => await mostBookStorage.get(),
  listCategory: false
};

const book = (state = inisialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_BOOK_RECOMENDED:
      bookRecomendedStorage.set(action.payload);
      return { ...state, bookRecomended: action.payload };
    case SET_MOST_READ_BOOK:
      mostBookStorage.set(action.payload);
      return { ...state, mostReadBook: action.payload };
    case SET_LIST_CATEGORY:
      return { ...state, listCategory: action.payload };
    default:
      return state;
  }
};

export default book;
