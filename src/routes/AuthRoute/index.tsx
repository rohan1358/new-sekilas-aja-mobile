import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { pages } from "../../constants";
import { SignIn, SignUp } from "../../screens";

const Stack = createStackNavigator();

const AuthRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={pages.SignUp}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={pages.SignUp} component={SignUp} />
      <Stack.Screen name={pages.SignIn} component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthRoute;
