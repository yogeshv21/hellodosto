import React, {useState, useEffect} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Search, Details, Profile, Home, Friends, Chat, ChatUsers} from '../Screens/Index';
import {useSelector, useDispatch} from 'react-redux';
import {getUserDetails} from '../Redux/Actions/userDataAction';
import {ActivityIndicator} from 'react-native-paper';

const Stack = createNativeStackNavigator();
const TopTab = createBottomTabNavigator();

const DashBoard = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.user);
  const {loading} = useSelector(state => state.userDetails);

  useEffect(() => {
    dispatch(getUserDetails(currentUser));
  }, []);

  if (loading) {
    return <ActivityIndicator size="medium" />;
  }

  return (
    <TopTab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <TopTab.Screen name="Search" component={Search} />
      <TopTab.Screen name="Home" component={Home} />
      <TopTab.Screen name="Friends" component={Friends} />
    </TopTab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Chat" component={Chat} options={({ navigation, route }) => ({
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
              />
            ),
        })}/>
      <Stack.Screen name="ChatUsers" component={ChatUsers} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={DashBoard} />
      <Stack.Screen name="Stack" component={StackNavigator} />
    </Stack.Navigator>
  );
};

export default MainStack;