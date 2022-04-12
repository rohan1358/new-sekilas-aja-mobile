import { Appearance } from "react-native";
import {
  CLOSE_MODAL_SUBSCRIBE,
  MODE,
  OPEN_MODAL_SUBSCRIBE
} from "../actionTypes";

interface initialStateItf {
  modalSubscribeRedux: any;
  mode: any;
}

const inisialState: initialStateItf = {
  modalSubscribeRedux: true,
  mode: Appearance.getColorScheme()
};

const mainRedux = (
  state = inisialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case OPEN_MODAL_SUBSCRIBE:
      return { ...state, modalSubscribeRedux: true };
    case CLOSE_MODAL_SUBSCRIBE:
      return { ...state, modalSubscribeRedux: false };

    case MODE:
      return { ...state, mode: action.payload };

    default:
      return state;
  }
};

export default mainRedux;
