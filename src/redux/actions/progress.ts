import { SET_PROGRESS } from "../actionTypes";

export const setProgress = (data: any) => {
  return {
    type: SET_PROGRESS,
    payload: data
  };
};
