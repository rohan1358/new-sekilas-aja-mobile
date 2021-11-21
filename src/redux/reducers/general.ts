import { SAVE, CLEAR } from "../actionTypes";

interface GeneralReducerIfc {
  keywords: string[];
}

const initialState: GeneralReducerIfc = {
  keywords: [],
};

const generalReducer = (
  state = initialState,
  action: { type: string; payload: string }
): GeneralReducerIfc => {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        keywords: [...new Set([...state.keywords, action.payload])],
      };

    case CLEAR:
      return { ...state, keywords: [] };

    default:
      return state;
  }
};

export default generalReducer;
