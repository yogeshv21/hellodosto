import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

import {OnboardingScreen, Login, SignUp, Home} from '../Screens/Index'

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={SignUp}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
