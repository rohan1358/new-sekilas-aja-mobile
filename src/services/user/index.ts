import { firebaseNode } from "@constants";
import firestore from "@react-native-firebase/firestore";

const fetchProfile = (email: string) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.users)
        .where("email", "==", email)
        .get();
      const user = raw.docs[0].data();
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

export { fetchProfile };
