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
      const user = { ...raw.docs[0].data(), id: raw.docs[0].id };
      resolve({
        data: user,
        isSuccess: true,
        error: null,
        message: "Profile successfuly fetched.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch profile failed.",
      });
    }
  });
};

const modifyToken = ({
  FcmToken,
  id,
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
          FcmToken,
        })
        .then(() => {
          resolve({
            data: null,
            isSuccess: true,
            error: null,
            message: "Token successfuly updated.",
          });
        });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Token update failed.",
      });
    }
  });
};

export { fetchProfile, modifyToken };
