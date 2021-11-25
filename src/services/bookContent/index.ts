import { firebaseNode } from "@constants";
import firestore from "@react-native-firebase/firestore";

const fetchBookContent = ({ bookTitle }: { bookTitle: string }) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.books)
        .doc(bookTitle)
        .collection(firebaseNode.kilasan)
        .get();
      const pages = raw.docs.map((value) => {
        const item = value.data();
        const id = value.id;
        return {
          id,
          title:
            id === "ringkasan" && !item?.title
              ? "Ringkasan Akhir"
              : item?.title,
          kilas: item?.kilas,
          details: item?.details,
        };
      });

      resolve({
        data: { numberOfPage: raw.docs.length, pageContent: pages },
        isSuccess: true,
        error: null,
        message: "Book content successfuly fetched.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch book content failed.",
      });
    }
  });
};

const fetchBookTableOfContent = ({ bookTitle }: { bookTitle: string }) => {
  return new Promise<FetchResponse>(async (resolve, reject) => {
    try {
      const raw = await firestore()
        .collection(firebaseNode.books)
        .doc(bookTitle)
        .collection(firebaseNode.kilasan)
        .get();
      const data = raw.docs.map((value) => {
        const item = value.data();
        const id = value.id;
        return {
          id,
          title:
            id === "ringkasan" && !item?.title
              ? "Ringkasan Akhir"
              : item?.title,
          kilas: item?.kilas,
        };
      });

      resolve({
        data,
        isSuccess: true,
        error: null,
        message: "Book table of content successfuly fetched.",
      });
    } catch (error) {
      reject({
        data: null,
        isSuccess: false,
        error,
        message: "Fetch book table of content failed.",
      });
    }
  });
};

export { fetchBookContent, fetchBookTableOfContent };
