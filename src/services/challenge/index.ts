import firestore from "@react-native-firebase/firestore";

const collectionChallenge = firestore().collection("newChallenge");

export const getChallenge = (uid: any) => {
  return new Promise(async (resolve, reject) => {
    await collectionChallenge
      .get()
      .then(async (res) => {
        const results = res.docs.map(async (data) => {
          const { id } = data;
          const myProgress = await getMyProgress(id, uid);
          if (typeof myProgress !== "boolean") {
            return {
              ...data.data(),
              id: data.id,
              progress: myProgress.data
            };
          } else {
            return { ...data.data(), id: data.id, progress: [] };
          }
        });

        const newResults = await new Promise.all(results);
        resolve({
          data: newResults,
          message: "succees fetching challenge",
          status: "success"
        });
      })
      .catch((err) => {
        reject({
          data: false,
          message: "failed fetching challenge",
          status: "failed"
        });
      });
  });
};

export const fetchBookChallenge = (book: any) => {
  return new Promise<FetchResponse>((resolve, reject) => {
    firestore()
      .collection("books")
      .where("book_title", "in", book)
      .get()
      .then((res) => {
        const results = res.docs.map((cb) => cb.data());
        resolve({
          data: results,
          isSuccess: true,
          error: false,
          message: "success fetch book challenge"
        });
      })
      .catch((err) => {
        reject({
          data: null,
          isSuccess: false,
          error: true,
          message: "failed fetch book challenge"
        });
      });
  });
};

export const addDoneReadingChallenge = (challenge: any, { uid, book }: any) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection("newChallenge")
      .doc(challenge)
      .collection("user")
      .add({
        book,
        status: "done",
        uid,
        date: new Date()
      })
      .then((res) => {
        resolve({
          status: "success",
          isFailed: false,
          isSUccess: true
        });
      })
      .catch((err) => {
        reject({
          status: "failed",
          isFailed: true,
          error: err
        });
      });
  });
};

export const getMyProgress = (challenge: any, uid: any) => {
  return new Promise((resolve, reject) => {
    if (uid && challenge) {
      collectionChallenge
        .doc(challenge)
        .collection("user")
        .where("uid", "==", uid)
        .get()
        .then((res) => {
          const result = res.docs.map((cb) => {
            return { ...cb.data(), id: cb.id };
          });
          resolve({
            data: result,
            isSUccess: true,
            message: "success get progress"
          });
        })
        .catch((err) => {
          reject({
            data: [],
            isSUccess: false,
            message: "failed get progress"
          });
        });
    } else {
      reject({
        data: [],
        message: "email is required"
      });
    }
  });
};
