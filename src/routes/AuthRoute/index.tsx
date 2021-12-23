import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { pages } from '../../constants';
import { Home, SignIn, SignUp, Onboarding } from '../../screens';

const Stack = createStackNavigator();

const AuthRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName={pages.Onboarding}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={pages.SignUp} component={SignUp} />
      <Stack.Screen name={pages.SignIn} component={SignIn} />
      <Stack.Screen name={pages.Home} component={Home} />
      <Stack.Screen name={pages.Onboarding} component={Onboarding} />
    </Stack.Navigator>
  );
};

export default AuthRoute;
