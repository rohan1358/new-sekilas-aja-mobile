import {
  SET_VIDEO_MENTORING,
  SET_DISPLAY_MENTORING,
  SET_PROGRESS_MENTORING,
  CLOSE_FLOATING_MENTORING
} from "../actionTypes";

interface initialStateItf {
  progress: any;
  video: any;
  mentoring_exist: boolean;
  mentoringFooter: boolean;
  mentoringPage: boolean;
}

let dummyData = {
  video: {
    audio_link: ["1", "2", "3", "4", "5", "6", "7", "8"],
    author: "James Clear",
    book_cover:
      "https://firebasestorage.googleapis.com/v0/b/sekilasaja-999fd.appspot.com/o/Book_Cover_Images_JPG%2FAtomic%20Habits%20Cover.jpg?alt=mentoring&token=ec22d1c7-1007-4990-8074-68cf4a5abe1c",
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
    mentoring_id: "069dd8b0181fe6c08f",
    mentoring_link:
      "https://mentorings.sproutmentoring.com/embed/069dd8b0181fe6c08f/54cbce85df89c93d",
    watch_time: "23"
  }
};

const inisialState: initialStateItf = {
  progress: "",
  video: dummyData.video,
  mentoring_exist: true,
  mentoringFooter: true,
  mentoringPage: false
};

const MentoringReducers = (
  state = inisialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case SET_PROGRESS_MENTORING:
      return { ...state, progress: action.payload };

    case SET_VIDEO_MENTORING:
      return { ...state, video: action.payload, mentoring_exist: true };
    case SET_DISPLAY_MENTORING:
      if (action.payload === "page") {
        return { ...state, mentoringFooter: false, mentoringPage: true };
      } else {
        return { ...state, mentoringFooter: true, mentoringPage: false };
      }
    case CLOSE_FLOATING_MENTORING:
      return { ...state, video: false, mentoring_exist: false };

    default:
      return state;
  }
};

export default MentoringReducers;
