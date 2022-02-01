import { createNativeStackNavigator as createStackNavigator } from "@react-navigation/native-stack";
import { ReduxState } from "@rux";
import React, { useState } from "react";
import { OrientationLocker, PORTRAIT } from "react-native-orientation-locker";
import { useSelector } from "react-redux";
import {
  About,
  AccountSettings,
  BookDetail,
  BookTableContent,
  Category,
  Home,
  Listening,
  Notification,
  NotifSettings,
  PageEditProfile,
  Profile,
  Reading,
  Search,
  SignIn,
  SpecialBookList,
  Subscribe,
  Watching,
  ContentNotification,
  Explore,
  Mentoring,
  RewatchWebinar,
  Blog,
  ReadingBlog
} from "../../screens";
import { RootStackParamList } from "../../types";
import MainBottomRoute from "../MainBottomRoute";

const Stack = createStackNavigator<RootStackParamList>();

const MainRoute = () => {
  const {
    editProfile: { profile }
  } = useSelector((state: ReduxState) => state);
  const [isFirstTime, setFirstTime] = useState(false);
  React.useEffect(() => {
    if (!isFirstTime) {
      setFirstTime(true);
    }
  }, []);

  return (
    <>
      <OrientationLocker orientation={PORTRAIT} />
      <Stack.Navigator
        initialRouteName={"MainBottomRoute"}
        screenOptions={{ headerShown: false, animation: "fade" }}
      >
        <Stack.Screen
          name={"Home"}
          component={!isFirstTime ? Home : MainBottomRoute}
          // component={Home}
        />

        <Stack.Screen
          name={"Blog"}
          component={Blog}
          // component={Home}
        />

        <Stack.Screen
          name={"ReadBlog"}
          component={ReadingBlog}
          // component={Home}
        />

        <Stack.Screen
          name={"RewatchWebinar"}
          component={RewatchWebinar}
          // component={Home}
        />

        <Stack.Screen
          name={"Mentoring"}
          component={Mentoring}
          // component={Home}
        />
        {/* <Stack.Screen
        name={"Explore"}
        component={!isFirstTime ? Explore : MainBottomRoute}
      /> */}
        <Stack.Screen name={"SignIn"} component={SignIn} />

        {profile && (
          <Stack.Screen name={"MainBottomRoute"} component={MainBottomRoute} />
        )}

        <Stack.Screen name={"About"} component={About} />
        <Stack.Screen
          name={"ContentNotification"}
          component={ContentNotification}
          options={{
            animation: "slide_from_right"
          }}
        />
        <Stack.Screen name={"AccountSettings"} component={AccountSettings} />
        <Stack.Screen name={"Category"} component={Category} />
        <Stack.Screen
          name={"NotifSettings"}
          options={{
            animation: "slide_from_right"
          }}
          component={NotifSettings}
        />
        <Stack.Screen name={"PageEditProfile"} component={PageEditProfile} />
        <Stack.Screen name={"Profile"} component={Profile} />
        <Stack.Screen name={"Search"} component={Search} />
        <Stack.Screen name={"Notification"} component={Notification} />
        <Stack.Screen name={"BookDetail"} component={BookDetail} />
        <Stack.Screen name={"Reading"} component={Reading} />
        <Stack.Screen name={"BookTableContent"} component={BookTableContent} />
        <Stack.Screen name={"Listening"} component={Listening} />
        <Stack.Screen name={"Watching"} component={Watching} />
        <Stack.Screen name={"Subscribe"} component={Subscribe} />
        <Stack.Screen name={"SpecialBookList"} component={SpecialBookList} />
      </Stack.Navigator>
    </>
  );
};

export default MainRoute;
