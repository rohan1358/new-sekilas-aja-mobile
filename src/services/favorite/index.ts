import { firebaseNode } from '@constants';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { scrapBook } from '../../helpers';

const fetchBookByFavorit = (email: string) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const query: any = await fetchFavoriteBooks(email);

      const mostRaw: string[] = query ? query.book : [];

      const titles = scrapBook(mostRaw);
      const raw = await firestore()
        .collection(firebaseNode.books)
        .where('book_title', 'in', titles)
        .get();
      const result: BookResponse[] = raw.docs.map((item) => ({
        book_title: item.data()?.book_title,
        author: item.data()?.author,
        read_time: item.data()?.read_time,
        id: item.id,
        book_cover: item.data()?.book_cover,
        isVideoAvailable: !!item.data()?.video_link
      }));

      // @ts-ignore
      const books: BookResponse[] = titles.map((item) =>
        result.find((value) => value.book_title === item)
      );

      resolve({
        data: books,
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

const postBookFavorite = (id: any, data: any) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      await firestore().collection(firebaseNode.favorite).doc(id).set(data);
      resolve({
        data,
        isSuccess: true,
        error: null,
        message: 'add book to favorite success.'
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: 'add book to favorite failed.'
      });
    }
  });
};

const fetchFavoriteBooks = async (id: any) => {
  const raw = await firestore().collection(firebaseNode.favorite).doc(id).get();
  return raw.data();
};

export { postBookFavorite, fetchFavoriteBooks, fetchBookByFavorit };
