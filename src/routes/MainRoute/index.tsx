import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { pages } from "../../constants";
import { Onboarding, SignIn } from "../../screens";
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
      <Stack.Screen name={pages.Onboarding} component={Onboarding} />
    </Stack.Navigator>
  );
};

export default MainRoute;
