import firestore from "@react-native-firebase/firestore";

interface FetchResponseLastRead {
  data: any;
  message: string;
  isSuccess: boolean;
  error: any;
}

const setTrackingLastReadLinten = (email: any, data: any) => {
  return new Promise((resolve, reject) => {
    // testing
    try {
      firestore()
        .collection("lastReadBook")
        .doc(email)
        .set(data, { merge: true })
        .then((res) => {
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    } catch {
      reject(false);
    }
  });
};
const getLastReading = async (email: string) => {
  return new Promise<FetchResponseLastRead>(async (resolve, reject) => {
    // testing
    try {
      const lastRead: any = await firestore()
        .collection("lastReadBook")
        .doc(email)
        .get();

      resolve({
        data: lastRead?.data().book,
        message: "success",
        isSuccess: true,
        error: false
      });
    } catch {
      reject({
        data: false,
        message: "success",
        isSuccess: false,
        error: true
      });
    }
  });
};

export { setTrackingLastReadLinten, getLastReading };
