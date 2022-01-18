import {
  FETCH_NOTIF_PROMO,
  LOAD_FETCH_NOTIF,
  FETCH_NOTIF_INBOX,
  FETCH_CONTENT_NOTIF
} from "../actionTypes/notif";

export const handleFetchNotifPromo = (data: any) => {
  return {
    type: FETCH_NOTIF_PROMO,
    payload: data
  };
};

export const handleFetchNotifInbox = (data: any) => {
  return {
    type: FETCH_NOTIF_INBOX,
    payload: data
  };
};

export const handleLoadFetchNotif = (data: any) => {
  return {
    type: LOAD_FETCH_NOTIF,
    payload: data
  };
};

export const handleFetchContentNotif = (data: any) => {
  return {
    type: FETCH_CONTENT_NOTIF,
    payload: data
  };
};
