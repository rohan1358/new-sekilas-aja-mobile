import { firebaseNode } from "@constants";
import firestore from "@react-native-firebase/firestore";
import { logger } from "../../helpers";
import { firebaseTrackPayment, getInvoices } from "../payment";

const fetchProfile = (email: string, uid?: any) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      // const raw = uid
      //   ? await firestore().collection("users").doc(uid).get()
      //   : await firestore()
      //   .collection(firebaseNode.users)
      //   .where("email", "==", email)
      //   .get();

      const raw = await firestore()
        .collection(firebaseNode.users)
        .doc(uid)
        .get();

      const newData: any = raw.data();
      const id = raw.id;
      const { is_subscribed }: any = newData;
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

        const { promo_code_invoice, promo_codes_used }: any = user;

        const userPromoCodes = promo_code_invoice
          ? [...promo_codes_used, promo_code_invoice]
          : promo_codes_used;

        getInvoices(newData.id_incoive).then((res: any) => {
          const { data, isSuccess } = res;

          const { email, phoneNumber, promo_code_invoice } = newData;
          if (["SETTLED", "PAID"].includes(data.status) && isSuccess) {
            if (data.description == "Subscription 12 Bulan") {
              end_date.setMonth(end_date.getMonth() + 12);
            } else if (data.description == "Subscription 3 Bulan") {
              end_date.setMonth(end_date.getMonth() + 3);
            } else if (data.description == "Subscription 1 Bulan") {
              end_date.setMonth(end_date.getMonth() + 1);
            }
            firebaseTrackPayment({
              email,
              date: new Date(),
              phoneNumber: phoneNumber || "",
              item: data.description || "",
              kode_promo: promo_code_invoice
            });

            updateUser(email, {
              is_subscribed: true,
              end_date: end_date,
              start_date: start_date,
              id_incoive: "",
              promo_codes_used: userPromoCodes,
              promo_code_invoice: ""
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
        if (raw.data()) {
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
        .collection(firebaseNode.users)
        .where("email", "==", email)
        .get()
        .then((resGetuser) => {
          firestore()
            .collection(firebaseNode.users)
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
