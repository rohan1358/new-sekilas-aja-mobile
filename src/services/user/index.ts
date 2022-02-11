import { firebaseNode } from "@constants";
import firestore from "@react-native-firebase/firestore";
import { logger } from "../../helpers";
import { firebaseTrackPayment, getInvoices } from "../payment";

const fetchProfile = (email: string) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.users)
        .where("email", "==", email)
        .get();

      const newData = raw.docs[0].data();
      const id = raw.docs[0].id;
      const { is_subscribed } = newData;
      const rawData = {
        ...newData,
        is_subscribed:
          newData.end_date.toDate() < new Date() && is_subscribed
            ? false
            : is_subscribed
      };

      const user = { ...rawData, id };

      if (newData.id_incoive) {
        // get invoices
        const start_date = new Date();
        let end_date = new Date();

        getInvoices(newData.id_incoive).then((res: any) => {
          const { email, phoneNumber, promo_code_invoice } = newData;
          if (["SETTLED"].includes(res.status) && res.isSuccess) {
            if (res.description == "Subscription 12 Bulan") {
              end_date.setMonth(end_date.getMonth() + 12);
            } else if (res.description == "Subscription 3 Bulan") {
              end_date.setMonth(end_date.getMonth() + 3);
            } else if (res.description == "Subscription 1 Bulan") {
              end_date.setMonth(end_date.getMonth() + 1);
            }
            firebaseTrackPayment({
              email,
              date: new Date(),
              phoneNumber: phoneNumber || "",
              item: res.description || "",
              kode_promo: promo_code_invoice
            });

            updateUser(email, {
              is_subscribed: true,
              end_date: end_date,
              start_date: start_date,
              id_incoive: ""
            })
              .then((res) => {
                resolve({
                  data: {
                    ...user,
                    is_subscribed: true,
                    end_date: end_date,
                    start_date: start_date,
                    id_incoive: ""
                  },
                  isSuccess: true,
                  error: null,
                  message: "Profile successfuly fetched."
                });
              })
              .catch((err) => {
                resolve({
                  data: { ...user },
                  isSuccess: true,
                  error: null,
                  message: "Profile successfuly fetched."
                });
              });
          } else {
            resolve({
              data: { ...user },
              isSuccess: true,
              error: null,
              message: "Profile successfuly fetched."
            });
          }
        });
      } else {
        if (raw.docs[0].data()) {
          if (newData.end_date.toDate() < new Date() && is_subscribed) {
            firestore().collection(firebaseNode.users).doc(id).update(rawData);
          }
        }
        resolve({
          data: { ...user },
          isSuccess: true,
          error: null,
          message: "Profile successfuly fetched."
        });
      }
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch profile failed."
      });
    }
  });
};

const fetchProfileRealtime = async (email: string) => {
  try {
    await firestore()
      .collection(firebaseNode.users)
      .where("email", "==", "riskiggg125@gmail.com")
      .onSnapshot((res) => {});
  } catch {
    return {};
  }
};

const modifyToken = ({
  FcmToken,
  id
}: {
  FcmToken: string;
  id: string | undefined;
}) => {
  if (!id) return;
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      await firestore()
        .collection(firebaseNode.users)
        .doc(id)
        .update({
          FcmToken
        })
        .then(() => {
          resolve({
            data: null,
            isSuccess: true,
            error: null,
            message: "Token successfuly updated."
          });
        });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Token update failed."
      });
    }
  });
};

export const updateUser = (email: any, data: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((resGetuser) => {
          firestore()
            .collection("users")
            .doc(resGetuser.docs[0].id)
            .update(data)
            .then((res) => {
              resolve({
                status: "success",
                isSuccess: true,
                isFailed: false
              });
            });
        });
    } catch {
      reject({
        status: "failed",
        isSuccess: false,
        isFailed: true
      });
    }
  });
};

export { fetchProfile, modifyToken, fetchProfileRealtime };
