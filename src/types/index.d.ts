import { NavigatorScreenParams } from "@react-navigation/core";

type MainBottomTabParamList = {
  Home: undefined;
  Explore: undefined;
  Library: undefined;
};

type RootStackParamList = {
  About: undefined;
  AccountSettings: undefined;

  BookDetail: undefined;

  Category: {
    type: "category" | "special";
    title: string;
    payload: string | undefined;
  };

  Home: undefined;

  MainBottomRoute: NavigatorScreenParams<MainBottomTabParamList>;

  Notification: undefined;
  NotifSettings: undefined;

  PageEditProfile: undefined;
  Profile: undefined;

  Reading: { id: string };

  Search: undefined;
  SignIn: undefined;
};
