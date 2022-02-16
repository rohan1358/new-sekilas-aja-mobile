import { CLOSE_MODAL_SUBSCRIBE, OPEN_MODAL_SUBSCRIBE } from "../actionTypes";

export const handleOpenModalSubscribe = () => {
  return { type: OPEN_MODAL_SUBSCRIBE, payload: true };
};

export const handleCloseModalSubscribe = () => {
  return { type: CLOSE_MODAL_SUBSCRIBE, payload: false };
};
