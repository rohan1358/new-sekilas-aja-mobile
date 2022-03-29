import {
  CLOSE_FLOATING_MEDIA,
  SET_AUDIO_BOOK,
  SET_DISPLAY_AUDIO,
  SET_LIST_KILAS_AUDIO,
  SET_PROGRESS_AUDIO
} from "../actionTypes";

interface initialStateItf {
  progress?: any;
  book?: any;
  audio_exist?: boolean;
  audioFooter?: boolean;
  audioPage?: boolean;
  listKilasAudio: any;
}

const inisialState: initialStateItf = {
  progress: "",
  book: false,
  audio_exist: false,
  audioFooter: false,
  audioPage: false,
  listKilasAudio: {
    "Atomic Habits": [
      {
        artist: "James Clear",
        duration: 51.888,
        title: "Atomic Habits",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FAtomic%20Habits%2F1.mp3?alt=media&token=6d298053-5b41-4a16-ba26-8ae18cd84729"
      },
      {
        artist: "James Clear",
        duration: 177.84,
        title: "Atomic Habits",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FAtomic%20Habits%2F2.mp3?alt=media&token=694715c2-7772-4c30-97fb-c30db0c64b12"
      },
      {
        artist: "James Clear",
        duration: 182.472,
        title: "Atomic Habits",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FAtomic%20Habits%2F3.mp3?alt=media&token=ab84b53d-ad10-4fa6-8c2c-ff9248817a6c"
      },
      {
        artist: "James Clear",
        duration: 189.408,
        title: "Atomic Habits",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FAtomic%20Habits%2F4.mp3?alt=media&token=3ef06749-81e5-4d7a-a72e-21df1dc414af"
      },
      {
        artist: "James Clear",
        duration: 203.088,
        title: "Atomic Habits",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FAtomic%20Habits%2F5.mp3?alt=media&token=797b1e6b-d75a-4fea-a146-580956f0b983"
      },
      {
        artist: "James Clear",
        duration: 169.824,
        title: "Atomic Habits",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FAtomic%20Habits%2F6.mp3?alt=media&token=a3c7e35b-afc0-42ba-8675-8fa8cd71f0cc"
      },
      {
        artist: "James Clear",
        duration: 204.888,
        title: "Atomic Habits",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FAtomic%20Habits%2F7.mp3?alt=media&token=360fe26a-6e85-47d8-ada3-b6e7b013582d"
      },
      {
        artist: "James Clear",
        duration: 188.04,
        title: "Atomic Habits",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FAtomic%20Habits%2F8.mp3?alt=media&token=ae20bb3e-15b2-4a52-91f6-8701e17fae5c"
      },
      {
        artist: "James Clear",
        duration: 29.256,
        title: "Atomic Habits",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FAtomic%20Habits%2F9.mp3?alt=media&token=9bc5c58f-f7b8-4e45-9bea-4d890fd44e8c"
      }
    ],
    "The Little Book of Common Sense Investing": [
      {
        artist: "John C. Bogle",
        duration: 85.891,
        title: "The Little Book of Common Sense Investing",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing%2F1.mp3?alt=media&token=178c0719-570a-4030-ab2b-8f331a8e213f"
      },
      {
        artist: "John C. Bogle",
        duration: 132.101,
        title: "The Little Book of Common Sense Investing",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing%2F2.mp3?alt=media&token=d4fb2a2b-a198-4d54-b1b2-8b15dfeda6b2"
      },
      {
        artist: "John C. Bogle",
        duration: 123.768,
        title: "The Little Book of Common Sense Investing",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing%2F3.mp3?alt=media&token=d4b05dfc-b521-4b27-be73-0c4a773e265b"
      },
      {
        artist: "John C. Bogle",
        duration: 121.94,
        title: "The Little Book of Common Sense Investing",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing%2F4.mp3?alt=media&token=4840d3bb-0aeb-4a60-868d-c7ba987a1a29"
      },
      {
        artist: "John C. Bogle",
        duration: 109.845,
        title: "The Little Book of Common Sense Investing",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing%2F5.mp3?alt=media&token=c1fa9afd-fe8c-41a0-b246-ae8c464f0596"
      },
      {
        artist: "John C. Bogle",
        duration: 55.798,
        title: "The Little Book of Common Sense Investing",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing%2F6.mp3?alt=media&token=58291502-d090-4487-a9dc-731acbe1f957"
      },
      {
        artist: "John C. Bogle",
        duration: 104.699,
        title: "The Little Book of Common Sense Investing",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing%2F7.mp3?alt=media&token=dc05a309-0244-4741-92e4-47936e16aed8"
      },
      {
        artist: "John C. Bogle",
        duration: 21.342,
        title: "The Little Book of Common Sense Investing",
        url: "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Audio%2FThe%20Little%20Book%20of%20Common%20Sense%20Investing%2F8.mp3?alt=media&token=e757cd01-4038-41d8-b762-a9638e71ebdd"
      }
    ]
  }
};

const audioReducer = (
  state = inisialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_PROGRESS_AUDIO:
      return { ...state, progress: action.payload };

    case SET_AUDIO_BOOK:
      return { ...state, book: action.payload, audio_exist: true };
    case SET_DISPLAY_AUDIO:
      if (action.payload === "page") {
        return { ...state, audioFooter: false, audioPage: true };
      } else {
        return { ...state, audioFooter: true, audioPage: false };
      }
    case CLOSE_FLOATING_MEDIA:
      return { ...state, book: false, audio_exist: false };
    case SET_LIST_KILAS_AUDIO:
      return {
        ...state,
        listKilasAudio: { ...state.listKilasAudio, ...action.payload }
      };

    default:
      return { ...state };
  }
};

export default audioReducer;
