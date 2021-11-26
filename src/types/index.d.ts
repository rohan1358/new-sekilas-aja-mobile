import { NavigatorScreenParams } from "@react-navigation/core";
import { BookTableOfContentProps } from "../screens/BookTableContent/types";

type MainBottomTabParamList = {
  Home: undefined;
  Explore: undefined;
  Library: undefined;
};

type RootStackParamList = {
  About: undefined;
  AccountSettings: undefined;

  BookDetail: undefined;
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

  MainBottomRoute: NavigatorScreenParams<MainBottomTabParamList>;

  Notification: undefined;
  NotifSettings: undefined;

  PageEditProfile: undefined;
  Profile: undefined;

  Reading: { id: string; page?: string };

  Search: undefined;
  SignIn: undefined;
};
