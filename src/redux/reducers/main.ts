import { CLOSE_MODAL_SUBSCRIBE, OPEN_MODAL_SUBSCRIBE } from "../actionTypes";

interface initialStateItf {
  modalSubscribeRedux: any;
}

const inisialState: initialStateItf = {
  modalSubscribeRedux: true
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

    default:
      return state;
  }
};

export default mainRedux;
