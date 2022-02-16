import { EMAIL, NAMA, PASSWORD, PROFILE } from "../actionTypes";
import {
  SET_CHALLENGE,
  SET_DONE_READING_CHALLENGE
} from "../actionTypes/challenge";
import { bookRecomendedStorage, mostBookStorage } from "../store";

interface IProfile {
  owned_books: string[];
  id: string;
}

interface initialStateItf {
  challenge: any;
  doneReadingChallenge: any;
}

const inisialState: initialStateItf = {
  challenge: false,
  doneReadingChallenge: false
};

const book = (state = inisialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_CHALLENGE:
      bookRecomendedStorage.set(action.payload);
      return { ...state, challenge: action.payload };
    case SET_DONE_READING_CHALLENGE:
      mostBookStorage.set(action.payload);
      return { ...state, doneReadingChallenge: action.payload };
    default:
      return state;
  }
};

export default book;
