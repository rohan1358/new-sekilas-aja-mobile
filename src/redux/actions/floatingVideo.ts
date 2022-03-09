import {
  CLOSE_FLOATING_VIDEO,
  SET_DISPLAY_VIDEO,
  SET_PROGRESS_VIDEO,
  SET_VIDEO_BOOK
} from "../actionTypes";

export const setProgressVideoRedux = (value: any) => {
  return {
    type: SET_PROGRESS_VIDEO,
    payload: value
  };
};

export const setVideoBookRedux = (value: any) => {
  return {
    type: SET_VIDEO_BOOK,
    payload: value
  };
};

export const setDisplayVideoRedux = (display: any) => {
  return {
    type: SET_DISPLAY_VIDEO,
    payload: display
  };
};

export const closeFloatingVideo = () => {
  return {
    type: CLOSE_FLOATING_VIDEO
  };
};
