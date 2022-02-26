import { EMAIL, NAMA, PASSWORD, PROFILE } from "../actionTypes";
import {
  SET_BOOK_RECOMENDED,
  SET_MOST_READ_BOOK,
  SET_LIST_CATEGORY,
  SET_DURATION_AUDIO
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
  duration: number;
}

const inisialState: initialStateItf = {
  nama: "",
  email: "",
  password: "",
  profile: null,
  bookRecomended: false,
  mostReadBook: false,
  listCategory: false,
  duration: 0
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
    case SET_DURATION_AUDIO:
      return {
        ...state,
        duration:
          action.payload === "reset" ? 0 : state.duration + action.payload
      };
    default:
      return state;
  }
};

export default book;
