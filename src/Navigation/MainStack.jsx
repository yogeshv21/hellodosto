import React, {useState, useEffect} from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Search,
  Details,
  Profile,
  Home,
  Friends,
  Chat,
  ChatUsers,
  Map
} from '../Screens/Index';
import {useSelector, useDispatch} from 'react-redux';
import {getUserDetails} from '../Redux/Actions/userDataAction';
import {ActivityIndicator} from 'react-native-paper';
import { View, Text } from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../Theme/Theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
    initialRouteName="Home"
    screenOptions={
        {
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 70,
                borderTopColor: 'white'
            },
        }
    }
      
      >
      <TopTab.Screen name="Search" component={Search}  
      options={{
        tabBarIcon: ({focused}) => (
          <View
            style={{
              alignItems: 'center',
            }}>
            <Icon
              name={'search'}
              size={SIZES.extraLarge}
              color={focused ? COLORS.primary : COLORS.gray}
            />
          </View>
        ),
      }}
      />
      <TopTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
              }}>
              <Icon
                name={'home'}
                size={SIZES.extraLarge}
                color={focused ? COLORS.primary : COLORS.gray}
              />
            </View>
          ),
        }}
      />
      <TopTab.Screen name="Friends" component={Friends} 
         options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
              }}>
              <Icon
                name={'user-friends'}
                size={SIZES.extraLarge}
                color={focused ? COLORS.primary : COLORS.gray}
              />
            </View>
          ),
        }}
      />
    </TopTab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Details" component={Details} options={{
            headerShown: false,
          }}/>
      <Stack.Screen name="Profile" component={Profile} options={{
            headerShown: false,
          }}/>
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChatUsers" component={ChatUsers} options={{
            headerShown: false,
          }} />
      <Stack.Screen name="Map" component={Map}  options={{
            headerShown: false,
          }}/>
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
