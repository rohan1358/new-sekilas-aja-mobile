import {
  CLOSE_FLOATING_MENTORING,
  SET_DISPLAY_MENTORING,
  SET_PROGRESS_MENTORING,
  SET_VIDEO_MENTORING
} from "../actionTypes";

export const setProgressMentoringRedux = (value: any) => {
  return {
    type: SET_PROGRESS_MENTORING,
    payload: value
  };
};

export const setVideoMentoringRedux = (value: any) => {
  return {
    type: SET_VIDEO_MENTORING,
    payload: value
  };
};

export const setDisplayMentoringRedux = (display: any) => {
  return {
    type: SET_DISPLAY_MENTORING,
    payload: display
  };
};

export const closeFloatingMentoring = () => {
  return {
    type: CLOSE_FLOATING_MENTORING
  };
};
