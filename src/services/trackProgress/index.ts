import firestore from "@react-native-firebase/firestore";
const fireInProgress = firestore().collection("inProgress");
export const trackProgress = (route?: any, body?: any) => {
  return new Promise((resolve, reject) => {
    fireInProgress
      .doc(route)
      .set(body, {
        merge: true
      })
      .then((res) => {
        resolve({
          message: "success",
          isSuccess: true,
          isFailed: false
        });
      })
      .catch((err) => {
        reject({
          message: "failed",
          isSuccess: false,
          isFailed: true
        });
      });
  });
};

export const getAllProgress = (uid: any) => {
  return new Promise((resolve, reject) => {
    fireInProgress
      .where("user", "==", uid)
      .get()
      .then((res) => {
        const results = res.docs.map((cb) => {
          return { ...cb.data(), id: cb.id };
        });

        if (results && results.length > 0) {
          resolve({
            data: results,
            message: "success",
            isSuccess: true,
            isFailed: false
          });
        } else {
          reject({
            data: null,
            message: "failed",
            isSuccess: false,
            isFailed: true
          });
        }
      })
      .catch((err) => {
        reject({
          data: null,
          message: "failed",
          isSuccess: false,
          isFailed: true
        });
      });
  });
};

export const getProgressByBook = (route: any, by: any) => {
  return new Promise((resolve, reject) => {
    try {
      fireInProgress
        .doc(route)
        .get()
        .then((res: any) => {
          if (res.data() && res?.data()[by]) {
            resolve({
              data: res?.data()[by],
              status: "success get progress by type",
              isSUccess: true,
              isFailed: false
            });
          } else {
            reject({
              data: null,
              status: "failed get progress by type",
              isSUccess: false,
              isFailed: true
            });
          }
        });
    } catch {
      reject({
        data: null,
        status: "failed get progress by type, pleace check your connection",
        isSUccess: false,
        isFailed: true
      });
    }
  });
};

export const doneProgress = (book: any) => {
  return new Promise((resolve, reject) => {
    fireInProgress
      .doc(book)
      .delete()
      .then((res) => {
        resolve({
          message: "success remove progress",
          is_success: true
        });
      })
      .catch(() => {
        reject({
          message: "success remove progress",
          is_success: true
        });
      });
  });
};
