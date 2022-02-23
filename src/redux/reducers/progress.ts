import { SET_PROGRESS } from "../actionTypes";
import { bookRecomendedStorage, mostBookStorage } from "../store";

const inisialState: any = {
  author: "",
  book_cover: "",
  book_title: "",
  id: "",
  listening: {
    bab: 0,
    persentase: 0,
    time: 0
  },
  reading: {
    kilas: 0,
    persentase: 0
  },
  user: "",
  watching: {
    kilas: 0,
    persentase: 0,
    time: 0
  }
};

const book = (state = inisialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_PROGRESS:
      bookRecomendedStorage.set(action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default book;
