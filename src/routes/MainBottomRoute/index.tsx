import { FancyBottomTab } from "@components";
import { pages } from "@constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Home, SignUp } from "../../screens";

const Tab = createBottomTabNavigator();

const MainBottomRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FancyBottomTab {...props} />}
    >
      <Tab.Screen name={pages.Home} component={Home} />
      <Tab.Screen name={pages.SignUp} component={SignUp} />
    </Tab.Navigator>
  );
};

export default MainBottomRoute;
