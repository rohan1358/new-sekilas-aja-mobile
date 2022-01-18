import {
  handleFetchNotifInbox,
  handleFetchNotifPromo,
  handleLoadFetchNotif
} from "@actions";
import firestore from "@react-native-firebase/firestore";
import { store } from "../../redux/store";

export const fetchNotifPromo = () => {
  return new Promise((resolve, reject) => {
    try {
      firestore()
        .collection("promoNotifications")
        .onSnapshot((res) => {
          const { listNotifPromo } = store.getState().notifRedux;
          store.dispatch(handleLoadFetchNotif(true));
          const result = res.docChanges().map((data) => {
            return { ...data.doc.data(), id: data.doc.id };
          });
          if (listNotifPromo && listNotifPromo.length === 0) {
            store.dispatch(handleFetchNotifPromo(result));
            store.dispatch(handleLoadFetchNotif(false));
          } else {
            firestore()
              .collection("promoNotifications")
              .get()
              .then((res) => {
                const newResult = res.docChanges().map((data) => {
                  return { ...data.doc.data(), id: data.doc.id };
                });
                store.dispatch(handleFetchNotifPromo(newResult));
              })
              .then((res) => {
                store.dispatch(handleLoadFetchNotif(false));
              });
          }

          resolve({
            data: result,
            isSuccess: true,
            isFailed: false,
            status: "success"
          });
        });
    } catch {
      reject({
        message: "pleace check your connection",
        status: "failed",
        isSuccess: false,
        isFailed: true
      });
    }
  });
};

export const fetchNotifInbox = () => {
  return new Promise((resolve, reject) => {
    try {
      firestore()
        .collection("mainNotifications")
        .onSnapshot((res) => {
          const { listNotifInbox } = store.getState().notifRedux;
          store.dispatch(handleLoadFetchNotif(true));
          const result = res.docChanges().map((data) => {
            return { ...data.doc.data(), id: data.doc.id };
          });

          if (listNotifInbox && listNotifInbox.length === 0) {
            store.dispatch(handleFetchNotifInbox(result));
            store.dispatch(handleLoadFetchNotif(false));
          } else {
            firestore()
              .collection("mainNotifications")
              .get()
              .then((res) => {
                const newResult = res.docChanges().map((data) => {
                  return { ...data.doc.data(), id: data.doc.id };
                });
                store.dispatch(handleFetchNotifInbox(newResult));
              })
              .then((res) => {
                store.dispatch(handleLoadFetchNotif(false));
              });
          }

          resolve({
            data: result,
            isSuccess: true,
            isFailed: false,
            status: "success"
          });
        });
    } catch {
      reject({
        message: "pleace check your connection",
        status: "failed",
        isSuccess: false,
        isFailed: true
      });
    }
  });
};

export const createNotifPromo = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      firestore()
        .collection("promoNotifications")
        .add(data)
        .then((res) => {
          resolve({ status: "success", isSuccess: true, isFailed: false });
        })
        .catch((err) => {
          reject({ status: "failed", isSuccess: false, isFailed: true });
        });
    } catch {
      reject({ status: "failed", isSuccess: false, isFailed: true });
    }
  });
};

export const notifHasOpen = (uid: string, data: any, email: any, type: any) => {
  return new Promise((resolve, reject) => {
    try {
      let dataToFetch = data ? [...data, email] : [email];
      firestore()
        .collection(type)
        .doc(uid)
        .update({ users: [...new Set(dataToFetch)] })
        .then((res) => {
          resolve({ status: "success", isSuccess: true, isFailed: false });
        })
        .catch((err) => {
          reject({ status: "failed", isSuccess: false, isFailed: true });
        });
    } catch (err) {
      reject({ status: "failed", isSuccess: false, isFailed: true });
    }
  });
};
