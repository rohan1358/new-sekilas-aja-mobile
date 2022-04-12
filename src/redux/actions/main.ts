import {
  CLOSE_MODAL_SUBSCRIBE,
  MODE,
  OPEN_MODAL_SUBSCRIBE
} from "../actionTypes";

export const handleOpenModalSubscribe = () => {
  return { type: OPEN_MODAL_SUBSCRIBE, payload: true };
};

export const handleMode = (mode: string) => {
  return { type: MODE, payload: mode };
};

export const handleCloseModalSubscribe = () => {
  return { type: CLOSE_MODAL_SUBSCRIBE, payload: false };
};
