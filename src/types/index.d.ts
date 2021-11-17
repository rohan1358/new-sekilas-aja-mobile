import { NavigatorScreenParams } from "@react-navigation/core";

type MainBottomTabParamList = {
  Home: undefined;
  Explore: undefined;
  Library: undefined;
};

type RootStackParamList = {
  MainBottomRoute: NavigatorScreenParams<MainBottomTabParamList>;
  SignIn: undefined;
  Home: undefined;
  About: undefined;
  AccountSettings: undefined;
  Category: {
    type: "category" | "special";
    title: string;
    payload: string | undefined;
  };
  NotifSettings: undefined;
  PageEditProfile: undefined;
  Profile: undefined;
  Search: undefined;
};
