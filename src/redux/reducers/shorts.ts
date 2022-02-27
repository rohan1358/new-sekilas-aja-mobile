import { SET_MY_SHORTS } from "../actionTypes";

interface initialStateItf {
  myShorts: any;
}

const inisialState: initialStateItf = {
  myShorts: []
};

const mainRedux = (
  state = inisialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_MY_SHORTS:
      return { ...state, myShorts: action.payload };

    default:
      return state;
  }
};

export default mainRedux;
