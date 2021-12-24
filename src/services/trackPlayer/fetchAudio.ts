import firebaseStorage from '@react-native-firebase/storage';
import firebaseFireStore from '@react-native-firebase/firestore';

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebaseStorage();

//Method to get book cover image from firebase storage
const getBookAudioURL = async (kilas: any, book: any) => {
  let listAudio: any = [];

  const getAudio = async (param: any) => {
    var audioRef = await storage.ref().child(param);
    return await audioRef.getDownloadURL();
  };
  let promise = kilas.map(async (audio: string, index: any) => {
    var refName = 'Book_Audio/' + book?.book_title + '/' + (index + 1) + '.mp3';

    let data = {
      title: book?.book_title,
      artist: book?.author,
      url: await getAudio(refName)
    };
    listAudio.push(data);
    return data;
  });

  const newListAudio = await Promise.all(promise);

  return newListAudio;
};

const getKilas = async (referenceName: any) => {
  let listKilas: any = [];
  const kilasan = await firebaseFireStore()
    .collection('books')
    .doc(referenceName)
    .collection('kilasan')
    .get();
  await kilasan.docChanges().map(async (kilas, index) => {
    listKilas.push(kilas.doc.data());
  });
  return listKilas;
};
export { getBookAudioURL, getKilas };
