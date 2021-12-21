import { firebaseNode } from "@constants";
import firestore, { firebase } from "@react-native-firebase/firestore";


const postBookFavorite = (id: any, data:any) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
       await firestore()
        .collection(firebaseNode.favorite)
        .doc(id).set(
          data
        )
      resolve({
        data,
        isSuccess: true,
        error: null,
        message: "add book to favorite success.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "add book to favorite failed.",
      });
    }
  });
};

const fetchFavoriteBooks = async (id: any) => {
   const raw = await firestore()
  .collection(firebaseNode.favorite)
  .doc(id)
  .get();
  return raw.data()
};

export {
  postBookFavorite, 
  fetchFavoriteBooks
};
