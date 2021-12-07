import { firebaseNode } from "@constants";
import firestore from "@react-native-firebase/firestore";
import { logger } from "../../helpers/helper";

const fetchBooks = () => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore().collection(firebaseNode.books).get();
      const books = raw.docs.map((item) => ({
        book_title: item.data()?.book_title,
        author: item.data()?.author,
        read_time: item.data()?.read_time,
        id: item.id,
        book_cover: item.data()?.book_cover,
        category: item.data()?.category,
      }));
      resolve({
        data: books,
        isSuccess: true,
        error: null,
        message: "Books successfuly fetched.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch books failed.",
      });
    }
  });
};

const fetchCategorizedBooks = ({
  category,
}: {
  category: string | undefined;
}) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.books)
        .where("category", "array-contains", category)
        .get();

      const books: BookResponse[] = raw.docs.map((item) => ({
        book_title: item.data()?.book_title,
        author: item.data()?.author,
        read_time: item.data()?.read_time,
        id: item.id,
        book_cover: item.data()?.book_cover,
        isVideoAvailable: !!item.data()?.video_link,
      }));
      resolve({
        data: books,
        isSuccess: true,
        error: null,
        message: "Categorized books successfuly fetched.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch categorized books failed.",
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
      const books: BookResponse[] = raw.docs.map((item) => ({
        book_title: item.data()?.book_title,
        author: item.data()?.author,
        read_time: item.data()?.read_time,
        id: item.id,
        book_cover: item.data()?.book_cover,
        isVideoAvailable: !!item.data()?.video_link,
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

const fetchReadingBook = (email: string) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.lastReadBook)
        .doc(email)
        .get();

      const rawBook = raw.data();

      if (!rawBook) {
        resolve({
          data: { book: "", book_cover: "", kilas: "", available: false },
          isSuccess: true,
          error: null,
          message: "Reading book successfuly fetched.",
        });
      }

      resolve({
        data: { ...rawBook?.book, available: true },
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
      const books: BookResponse[] = raw.docs.map((item) => ({
        book_title: item.data()?.book_title,
        author: item.data()?.author,
        read_time: item.data()?.read_time,
        id: item.id,
        book_cover: item.data()?.book_cover,
        isVideoAvailable: !!item.data()?.video_link,
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

const fetchReleasedBooks = () => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.books)
        .where("read_time", "!=", "")
        .orderBy("read_time", "desc")
        .limit(4)
        .get();
      const books: BookResponse[] = raw.docs.map((item) => ({
        book_title: item.data()?.book_title,
        author: item.data()?.author,
        read_time: item.data()?.read_time,
        id: item.id,
        book_cover: item.data()?.book_cover,
        isVideoAvailable: !!item.data()?.video_link,
      }));
      resolve({
        data: books.slice(2, 4),
        isSuccess: true,
        error: null,
        message: "New released books successfuly fetched.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch new released books failed.",
      });
    }
  });
};

const fetchTrendBooks = () => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.books)
        .where("read_time", "!=", "")
        .orderBy("read_time", "asc")
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
        message: "Trend books successfuly fetched.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch most trend books failed.",
      });
    }
  });
};

const fetchDetailBooks = (id:any) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.books)
        .doc(id)
        .get();
      const books = {
        book_title: raw.data()?.book_title,
        author: raw.data()?.author,
        read_time: raw.data()?.read_time,
        id: raw.id,
        book_cover: raw.data()?.book_cover,
        audio_link: raw.data()?.audio_link,
        category: raw.data()?.category,
        description: raw.data()?.description,
        short_desc: raw.data()?.short_desc,
        video_link: raw.data()?.video_link,
        watch_time: raw.data()?.watch_time,
      }
      resolve({
        data: books,
        isSuccess: true,
        error: null,
        message: "Trend books successfuly fetched.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch most trend books failed.",
      });
    }
  });
};

export {
  fetchBooks,
  fetchCategorizedBooks,
  fetchMostBooks,
  fetchReadingBook,
  fetchRecommendedBooks,
  fetchReleasedBooks,
  fetchTrendBooks,
  fetchDetailBooks,
};
