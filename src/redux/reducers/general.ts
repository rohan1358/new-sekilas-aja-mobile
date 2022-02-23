import {
  SAVE,
  CLEAR,
  TOGGLE_BOTTOM_TAB,
  OPEN_BOTTOM_TAB,
  CLOSE_BOTTOM_TAB
} from "../actionTypes";

interface GeneralReducerIfc {
  keywords: string[];
  isBottomTabHidden: boolean;
}

const initialState: GeneralReducerIfc = {
  keywords: [],
  isBottomTabHidden: false
};

const generalReducer = (
  state = initialState,
  action: { type: string; payload: any }
): GeneralReducerIfc => {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        keywords: [...new Set([...state.keywords, action.payload])]
      };

    case CLEAR:
      return { ...state, keywords: [] };

    case TOGGLE_BOTTOM_TAB:
      return {
        ...state,
        isBottomTabHidden: action.payload || !state.isBottomTabHidden
      };
    case OPEN_BOTTOM_TAB:
      return {
        ...state,
        isBottomTabHidden: true
      };
    case CLOSE_BOTTOM_TAB:
      return {
        ...state,
        isBottomTabHidden: false
      };

    default:
      return state;
  }
};

export default generalReducer;
