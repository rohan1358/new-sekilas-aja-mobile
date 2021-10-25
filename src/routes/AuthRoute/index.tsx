import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { pages } from "../../constants";
import { SignIn } from "../../screens";

const Stack = createStackNavigator();

const AuthRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={pages.SignIn}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={pages.SignIn} component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthRoute;
