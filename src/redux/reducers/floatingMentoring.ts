import {
  SET_VIDEO_MENTORING,
  SET_DISPLAY_MENTORING,
  SET_PROGRESS_MENTORING,
  CLOSE_FLOATING_MENTORING
} from "../actionTypes";

interface initialStateItf {
  progress: any;
  video: any;
  mentoring_exist: boolean;
  mentoringFooter: boolean;
  mentoringPage: boolean;
}

const inisialState: initialStateItf = {
  progress: "",
  video: false,
  mentoring_exist: false,
  mentoringFooter: false,
  mentoringPage: false
};

const MentoringReducers = (
  state = inisialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_PROGRESS_MENTORING:
      return { ...state, progress: action.payload };

    case SET_VIDEO_MENTORING:
      return { ...state, video: action.payload, mentoring_exist: true };
    case SET_DISPLAY_MENTORING:
      if (action.payload === "page") {
        return { ...state, mentoringFooter: false, mentoringPage: true };
      } else {
        return { ...state, mentoringFooter: true, mentoringPage: false };
      }
    case CLOSE_FLOATING_MENTORING:
      return { ...state, video: false, mentoring_exist: false };

    default:
      return state;
  }
};

export default MentoringReducers;
