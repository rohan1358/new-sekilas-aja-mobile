import { SAVE, CLEAR, TOGGLE_BOTTOM_TAB } from "../actionTypes";

const addSearchHistory = (payload: string) => ({
  type: SAVE,
  payload,
});

const clearSearchHistory = () => ({
  type: CLEAR,
});

const toggleBottomTab = (payload?: boolean) => ({
  type: TOGGLE_BOTTOM_TAB,
  payload,
});

export { addSearchHistory, clearSearchHistory, toggleBottomTab };
