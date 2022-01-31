import firestore from "@react-native-firebase/firestore";

export const getAllMentoring = () => {
  return new Promise((resolve, reject) => {
    try {
      firestore()
        .collection("mentoring")
        .get()
        .then(async (res) => {
          const results = res.docs.map((data) => {
            return { ...data.data(), id: data.id };
          });

          resolve({
            status: "success",
            data: results,
            isSuccess: true,
            isFailed: false
          });
        })
        .catch((err) => {
          reject({
            status: "success",
            message: "gagal memuat, mohon periksa jaringan internet anda",
            isSuccess: true,
            isFailed: false
          });
        });
    } catch {
      reject({
        status: "success",
        message: "gagal memuat, mohon periksa jaringan internet anda",
        isSuccess: true,
        isFailed: false
      });
    }
  });
};
