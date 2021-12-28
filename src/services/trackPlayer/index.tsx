import TrackPlayer from "react-native-track-player";
import firebase from "@react-native-firebase/storage";

module.exports = async function () {
  TrackPlayer.addEventListener("remote-play", () => TrackPlayer.play());

  TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause());

  TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.destroy());
};

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase();

//Method to get book cover image from firebase storage
const getBookAudioURL = (referenceName: string, referenceChapter: string) => {
  return "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FAtomic%20Habits%2F1.mp3?alt=media&token=6d298053-5b41-4a16-ba26-8ae18cd84729";

  //   var refName = 'Book_Audio/' + referenceName + '/' + referenceChapter + '.mp3';
  //   var audioRef = storage.ref().child(refName);

  //   var url = await audioRef.getDownloadURL();
  //   if (url) {
  //     return url;
  //   } else {
  //   }
};
export { getBookAudioURL };
