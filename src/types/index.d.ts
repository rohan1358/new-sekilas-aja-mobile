import { NavigatorScreenParams } from "@react-navigation/core";
import { BookTableOfContentProps } from "../screens/BookTableContent/types";

type SpecialCategoryProps =
  | "recommendation"
  | "newRelease"
  | "mostRead"
  | "trending"
  | "myFavorite"
  | "doneReading"
  | "bookChallenge";

type MainBottomTabParamList = {
  Home: undefined;
  Explore: undefined;
  Library: undefined;
};

type RootStackParamList = {
  Explore: undefined;
  Challenge: undefined;
  ListBookChallenge: undefined;
  Blog: undefined;
  ReadBlog: undefined;
  Mentoring: undefined;
  ContentNotification: undefined;
  About: undefined;
  AccountSettings: undefined;
  RewatchWebinar: undefined;

  BookDetail: { id: string };
  BookTableContent: {
    id: string;
    isFromReading?: boolean;
    readingPayload?: BookTableOfContentProps[];
  };

  Category: {
    type: "category" | "special";
    title: string;
    payload?: string;
  };

  Home: undefined;

  Listening: undefined;

  MainBottomRoute: NavigatorScreenParams<MainBottomTabParamList>;

  Notification: undefined;
  NotifSettings: undefined;

  PageEditProfile: undefined;
  Profile: undefined;

  Reading: { id: string; page?: string; book: any };

  Subscribe: undefined;

  Search: undefined;
  SignIn: undefined;
  SpecialBookList: { type: SpecialCategoryProps };

  Watching: undefined;
};
