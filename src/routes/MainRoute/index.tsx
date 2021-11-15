import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { pages } from "../../constants";
import {
  About,
  AccountSettings,
  Category,
  Home,
  NotifSettings,
  PageEditProfile,
  Profile,
  Search,
  SignIn,
} from "../../screens";
import MainBottomRoute from "../MainBottomRoute";

const Stack = createStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={pages.MainBottomRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={pages.MainBottomRoute} component={MainBottomRoute} />
      <Stack.Screen name={pages.SignIn} component={SignIn} />
      <Stack.Screen name={pages.Home} component={Home} />
      <Stack.Screen name={pages.About} component={About} />
      <Stack.Screen name={pages.AccountSettings} component={AccountSettings} />
      <Stack.Screen name={pages.Category} component={Category} />
      <Stack.Screen name={pages.NotifSettings} component={NotifSettings} />
      <Stack.Screen name={pages.PageEditProfile} component={PageEditProfile} />
      <Stack.Screen name={pages.Profile} component={Profile} />
      <Stack.Screen name={pages.Search} component={Search} />
    </Stack.Navigator>
  );
};

export default MainRoute;
