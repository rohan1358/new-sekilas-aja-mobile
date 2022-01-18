import {
  FETCH_NOTIF_PROMO,
  LOAD_FETCH_NOTIF,
  FETCH_NOTIF_INBOX,
  FETCH_CONTENT_NOTIF
} from "../actionTypes/notif";

interface GeneralReducerIfc {
  listNotifPromo: any;
  loading: any;
  listNotifInbox: any;
  contentNotif: any;
}

const initialState: GeneralReducerIfc = {
  listNotifPromo: [],
  listNotifInbox: [],
  loading: true,
  contentNotif: {}
};

const generalReducer = (
  state = initialState,
  action: { type: string; payload: string }
): GeneralReducerIfc => {
  switch (action.type) {
    case FETCH_NOTIF_PROMO:
      return {
        ...state,
        listNotifPromo: action?.payload || []
      };
    case FETCH_NOTIF_INBOX:
      return {
        ...state,
        listNotifInbox: action?.payload || []
      };
    case LOAD_FETCH_NOTIF:
      return {
        ...state,
        loading: action?.payload
      };
    case FETCH_CONTENT_NOTIF:
      return {
        ...state,
        contentNotif: action?.payload
      };

    default:
      return state;
  }
};

export default generalReducer;
