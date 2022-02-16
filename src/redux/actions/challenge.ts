import {
  SET_DONE_READING_CHALLENGE,
  SET_CHALLENGE
} from "../actionTypes/challenge";

export const setChallenge = (value: any) => ({
  type: SET_CHALLENGE,
  payload: value
});

export const setDoneReadChallenge = (value: any) => ({
  type: SET_DONE_READING_CHALLENGE,
  payload: value
});
