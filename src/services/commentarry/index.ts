import { firebaseNode } from '@constants';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { scrapBook } from '../../helpers';

const fetchCommentarryBook = (book: string) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.comment)
        .doc(book)
        .get();

      const newArr = (obj: any) => {
        if (typeof obj === 'object') {
          var arr = [];
          for (var k in obj) {
            arr.push(obj[k]);
          }
          return arr;
        } else {
          return false;
        }
      };
      const data = newArr(raw.data());

      resolve({
        data: data,
        isSuccess: true,
        error: null,
        message: 'fetch all book favorite is success.'
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: 'fetch all book favorite is failed.'
      });
    }
  });
};

export { fetchCommentarryBook };
