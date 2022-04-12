import {
  CLOSE_FLOATING_VIDEO,
  SET_VIDEO_BOOK,
  SET_DISPLAY_VIDEO,
  SET_PROGRESS_VIDEO
} from "../actionTypes";

interface initialStateItf {
  progress: any;
  book: any;
  video_exist: boolean;
  videoFooter: boolean;
  videoPage: boolean;
}

const inisialState: initialStateItf = {
  progress: "",
  book: false,
  video_exist: false,
  videoFooter: false,
  videoPage: false
};

const videoReducers = (
  state = inisialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_PROGRESS_VIDEO:
      return { ...state, progress: action.payload };

    case SET_VIDEO_BOOK:
      return {
        ...state,
        book: action.payload,
        video_exist: true,
        videoFooter: true
      };
    case SET_DISPLAY_VIDEO:
      if (action.payload === "page") {
        return { ...state, videoFooter: false, videoPage: true };
      } else {
        return { ...state, videoFooter: true, videoPage: false };
      }
    case CLOSE_FLOATING_VIDEO:
      return { ...state, book: false, video_exist: false };

    default:
      return state;
  }
};

export default videoReducers;
