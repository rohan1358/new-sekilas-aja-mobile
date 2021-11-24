import { pages } from "@constants";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  About,
  AccountSettings,
  BookDetail,
  Category,
  Home,
  Notification,
  NotifSettings,
  PageEditProfile,
  Profile,
  Reading,
  Search,
  SignIn,
} from "../../screens";
import { RootStackParamList } from "../../types";
import MainBottomRoute from "../MainBottomRoute";

const Stack = createStackNavigator<RootStackParamList>();

const MainRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={"MainBottomRoute"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={"MainBottomRoute"} component={MainBottomRoute} />
      <Stack.Screen name={"SignIn"} component={SignIn} />
      <Stack.Screen name={"Home"} component={Home} />
      <Stack.Screen name={"About"} component={About} />
      <Stack.Screen name={"AccountSettings"} component={AccountSettings} />
      <Stack.Screen name={"Category"} component={Category} />
      <Stack.Screen name={"NotifSettings"} component={NotifSettings} />
      <Stack.Screen name={"PageEditProfile"} component={PageEditProfile} />
      <Stack.Screen name={"Profile"} component={Profile} />
      <Stack.Screen name={"Search"} component={Search} />
      <Stack.Screen name={"Notification"} component={Notification} />
      <Stack.Screen name={"BookDetail"} component={BookDetail} />
      <Stack.Screen name={"Reading"} component={Reading} />
    </Stack.Navigator>
  );
};

export default MainRoute;
