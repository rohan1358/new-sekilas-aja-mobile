import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { pages } from "../../constants";
import { Home, SignIn, Onboarding } from "../../screens";

const Stack = createStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={pages.Onboarding}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={pages.Home} component={Home} />
      <Stack.Screen name={pages.SignIn} component={SignIn} />
      <Stack.Screen name={pages.Onboarding} component={Onboarding} />
    </Stack.Navigator>
  );
};

export default MainRoute;
