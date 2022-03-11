import {
  CLOSE_FLOATING_MEDIA,
  SET_AUDIO_BOOK,
  SET_DISPLAY_AUDIO,
  SET_LIST_KILAS_AUDIO,
  SET_PROGRESS_AUDIO
} from "../actionTypes";

export const setProgressAudioRedux = (value: any) => {
  return {
    type: SET_PROGRESS_AUDIO,
    payload: value
  };
};

export const setAudioBookRedux = (value: any) => {
  return {
    type: SET_AUDIO_BOOK,
    payload: value
  };
};

export const setDisplayAudioRedux = (display: any) => {
  return {
    type: SET_DISPLAY_AUDIO,
    payload: display
  };
};

export const closeFloatingMedia = () => {
  return {
    type: CLOSE_FLOATING_MEDIA
  };
};

export const setListKilasAudio = (payload?: any) => {
  return {
    type: SET_LIST_KILAS_AUDIO,
    payload
  };
};
