import {
  SAVE,
  CLEAR,
  TOGGLE_BOTTOM_TAB,
  OPEN_BOTTOM_TAB,
  CLOSE_BOTTOM_TAB
} from "../actionTypes";

const addSearchHistory = (payload: string) => ({
  type: SAVE,
  payload
});

const clearSearchHistory = () => ({
  type: CLEAR
});

const toggleBottomTab = (payload?: boolean) => ({
  type: TOGGLE_BOTTOM_TAB,
  payload
});

const closeBottomTab = (payload?: boolean) => ({
  type: OPEN_BOTTOM_TAB
});
const openBottomTab = () => ({
  type: CLOSE_BOTTOM_TAB
});

export {
  addSearchHistory,
  clearSearchHistory,
  toggleBottomTab,
  closeBottomTab,
  openBottomTab
};
