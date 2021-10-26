import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { pages } from "../../constants";
import { Home, SignIn } from "../../screens";

const Stack = createStackNavigator();

const MainRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={pages.Home}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={pages.SignIn} component={SignIn} />
      <Stack.Screen name={pages.Home} component={Home} />
    </Stack.Navigator>
  );
};

export default MainRoute;
