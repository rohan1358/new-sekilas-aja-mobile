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

let dummyData = {
  book: {
    audio_link: ["1", "2", "3", "4", "5", "6", "7", "8"],
    author: "James Clear",
    book_cover:
      "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Cover_Images_JPG%2FAtomic%20Habits%20Cover.jpg?alt=media&token=ec22d1c7-1007-4990-8074-68cf4a5abe1c",
    book_title: "Atomic Habits",
    category: ["All", "Pengembangan Diri"],
    description:
      "Atomic Habits adalah panduan paling komprehensif dan praktis tentang cara menciptakan kebiasaan baik, menghentikan kebiasaan buruk, dan menjadi 1 persen lebih baik setiap hari. Jika Kamu kesulitan dalam mengubah kebiasaan, itu bukan salah Kamu. Masalahnya ada di sistem Kamu.   Kebiasaan buruk terulang bukan karena Kamu tidak ingin berubah tetapi karena Kamu memiliki sistem perubahan yang salah. Ini adalah salah satu filosofi inti dari Atomic Habits: Kamu tidak berhasil mencapai level tujuanmu, Kamu gagal di dalam sistem Kamu. Dalam buku ini, Kamu akan menemukan teknik yang terbukti dapat membawa Kamu ke tingkat yang baru.  James Clear adalah salah satu pakar terkemuka di dunia tentang pembentukan kebiasaan. Dia dikenal karena kemampuannya untuk menyaring topik yang kompleks menjadi perilaku sederhana yang dapat dengan mudah diterapkan dalam kehidupan dan pekerjaan sehari-hari. Di sini, ia memanfaatkan ide-ide yang terbukti dari biologi, psikologi, dan ilmu saraf untuk membuat panduan yang mudah dipahami dalam membuat kebiasaan baik mudah untuk dilakukan.",
    descriptions: [
      "Atomic Habits adalah panduan paling komprehensif dan praktis tentang cara menciptakan kebiasaan baik, menghentikan kebiasaan buruk, dan menjadi 1 persen lebih baik setiap hari. Jika Kamu kesulitan dalam mengubah kebiasaan, itu bukan salah Kamu. Masalahnya ada di sistem Kamu. ",
      "Kebiasaan buruk terulang bukan karena Kamu tidak ingin berubah tetapi karena Kamu memiliki sistem perubahan yang salah. Ini adalah salah satu filosofi inti dari Atomic Habits: Kamu tidak berhasil mencapai level tujuanmu, Kamu gagal di dalam sistem Kamu. Dalam buku ini, Kamu akan menemukan teknik yang terbukti dapat membawa Kamu ke tingkat yang baru."
    ],
    id: "Atomic Habits",
    read_time: "15",
    short_desc:
      "Cara Mudah dan Terbukti untuk Membentuk Kebiasaan Baik dan Menghilangkan Kebiasaan Buruk",
    shorts_exist: true,
    video_id: "069dd8b0181fe6c08f",
    video_link:
      "https://videos.sproutvideo.com/embed/069dd8b0181fe6c08f/54cbce85df89c93d",
    watch_time: "23"
  }
};

const inisialState: initialStateItf = {
  progress: "",
  book: dummyData.book,
  audio_exist: true,
  audioFooter: true,
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
