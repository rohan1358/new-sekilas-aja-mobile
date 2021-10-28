import { firebaseNode } from "@constants";
import firestore from "@react-native-firebase/firestore";

const fetchReadingBook = (email: string) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.users)
        .where("email", "==", email)
        .get();
      const bookName = raw.docs[0].data()?.owned_books[0];
      const bookDetail = await firestore()
        .collection(firebaseNode.books)
        .where("book_title", "==", bookName)
        .get();
      const book = bookDetail.docs[0].data();
      resolve({
        data: book,
        isSuccess: true,
        error: null,
        message: "Reading book successfuly fetched.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch reading book failed.",
      });
    }
  });
};

const fetchRecommendedBooks = () => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.books)
        .where("read_time", "!=", "")
        .limit(6)
        .get();
      const books = raw.docs.map((item) => ({
        book_title: item.data()?.book_title,
        author: item.data()?.author,
        read_time: item.data()?.read_time,
        id: item.id,
        book_cover: item.data()?.book_cover,
      }));
      resolve({
        data: books,
        isSuccess: true,
        error: null,
        message: "Recommended books successfuly fetched.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch recommended books failed.",
      });
    }
  });
};

const fetchMostBooks = () => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.books)
        .where("read_time", "!=", "")
        .orderBy("read_time", "desc")
        .limit(2)
        .get();
      const books = raw.docs.map((item) => ({
        book_title: item.data()?.book_title,
        author: item.data()?.author,
        read_time: item.data()?.read_time,
        id: item.id,
        book_cover: item.data()?.book_cover,
      }));
      resolve({
        data: books,
        isSuccess: true,
        error: null,
        message: "Most read books successfuly fetched.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch most read books failed.",
      });
    }
  });
};

export { fetchReadingBook, fetchRecommendedBooks, fetchMostBooks };
