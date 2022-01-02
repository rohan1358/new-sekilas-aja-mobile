import { firebaseNode } from "@constants";
import firestore from "@react-native-firebase/firestore";
import { logger } from "../../helpers";

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
      if (raw.docs[0].data()) {
        if (newData.end_date.toDate() < new Date() && is_subscribed) {
          firestore().collection(firebaseNode.users).doc(id).update(rawData);
        }
      }

      const user = { ...rawData, id };
      resolve({
        data: user,
        isSuccess: true,
        error: null,
        message: "Profile successfuly fetched."
      });
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

export { fetchProfile, modifyToken, fetchProfileRealtime };
