import firestore from "@react-native-firebase/firestore";

const collectionChallenge = firestore().collection("newChallenge");

export const getChallenge = (email: any) => {
  return new Promise(async (resolve, reject) => {
    await collectionChallenge
      .get()
      .then(async (res) => {
        const results = res.docs.map(async (data) => {
          const { id } = data;
          const myProgress = await getMyProgress(id, email);
          if (typeof myProgress !== "boolean") {
            return {
              ...data.data(),
              id: data.id,
              progress: Object.keys(myProgress)
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

export const getMyProgress = (id: any, email: any) => {
  return new Promise((resolve, reject) => {
    if (email && id) {
      collectionChallenge
        .doc(id)
        .collection("user")
        .doc(email)
        .get()
        .then((res) => {
          resolve(res.data() || false);
        });
    } else {
      reject({
        message: "email is required"
      });
    }
  });
};
