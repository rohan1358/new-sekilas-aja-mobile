import { SAVE, CLEAR } from "../actionTypes";

const addSearchHistory = (payload: string) => ({
  type: SAVE,
  payload,
});

const clearSearchHistory = () => ({
  type: CLEAR,
});

export { addSearchHistory, clearSearchHistory };
