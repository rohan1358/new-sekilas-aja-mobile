import { FancyBottomTab } from "@components";
import { pages } from "@constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import {
  Home,
  Explore,
  Library,
  ModalSubscribe,
  Mentoring
} from "../../screens";

const Tab = createBottomTabNavigator();

const MainBottomRoute = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      tabBar={(props) => <FancyBottomTab {...props} />}
    >
      <Tab.Screen name={pages.Home} component={Home} />
      <Tab.Screen name={pages.Explore} component={Explore} />
      <Tab.Screen name={pages.Mentoring} component={Mentoring} />
      <Tab.Screen name={pages.Library} component={Library} />
      {/* <Tab.Screen
        name={pages.ModalSubs}
        component={
          <ModalSubscribe
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        }
      /> */}
    </Tab.Navigator>
  );
};

export default MainBottomRoute;
