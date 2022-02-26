import {
  SET_BOOK_RECOMENDED,
  SET_MOST_READ_BOOK,
  SET_LIST_CATEGORY,
  SET_DURATION_AUDIO
} from "../actionTypes/book";

export const setBookRecomended = (value: any) => ({
  type: SET_BOOK_RECOMENDED,
  payload: value
});

export const setMostReadBook = (value: any) => ({
  type: SET_MOST_READ_BOOK,
  payload: value
});
export const setListCategory = (value: any) => ({
  type: SET_LIST_CATEGORY,
  payload: value
});

export const setDurationAudioRedux = (value?: any) => ({
  type: SET_DURATION_AUDIO,
  payload: value
});
