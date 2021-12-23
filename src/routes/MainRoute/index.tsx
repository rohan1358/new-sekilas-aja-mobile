import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
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
  Watching
} from '../../screens';
import { RootStackParamList } from '../../types';
import MainBottomRoute from '../MainBottomRoute';

const Stack = createStackNavigator<RootStackParamList>();

const MainRoute = () => {
  const [isFirstTime, setFirstTime] = useState(false);
  React.useEffect(() => {
    if (!isFirstTime) {
      setFirstTime(true);
    }
  }, []);
  return (
    <Stack.Navigator
      initialRouteName={'MainBottomRoute'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={'Home'}
        component={!isFirstTime ? Home : MainBottomRoute}
      />
      <Stack.Screen name={'SignIn'} component={SignIn} />

      <Stack.Screen name={'MainBottomRoute'} component={MainBottomRoute} />

      <Stack.Screen name={'About'} component={About} />
      <Stack.Screen name={'AccountSettings'} component={AccountSettings} />
      <Stack.Screen name={'Category'} component={Category} />
      <Stack.Screen name={'NotifSettings'} component={NotifSettings} />
      <Stack.Screen name={'PageEditProfile'} component={PageEditProfile} />
      <Stack.Screen name={'Profile'} component={Profile} />
      <Stack.Screen name={'Search'} component={Search} />
      <Stack.Screen name={'Notification'} component={Notification} />
      <Stack.Screen name={'BookDetail'} component={BookDetail} />
      <Stack.Screen name={'Reading'} component={Reading} />
      <Stack.Screen name={'BookTableContent'} component={BookTableContent} />
      <Stack.Screen name={'Listening'} component={Listening} />
      <Stack.Screen name={'Watching'} component={Watching} />
      <Stack.Screen name={'Subscribe'} component={Subscribe} />
      <Stack.Screen name={'SpecialBookList'} component={SpecialBookList} />
    </Stack.Navigator>
  );
};

export default MainRoute;
