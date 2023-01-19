import React, {useState, useEffect} from 'react';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator, PermissionsAndroid } from 'react-native';
import {COLORS} from '../Theme/Index';
import {useDispatch, useSelector} from 'react-redux';
import {isUserExist} from '../Redux/Actions/authAction';
import {getUserDetails} from '../Redux/Actions/userDataAction';
import {getCurrentUserChat} from '../Redux/Actions/chatsAction';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import {OfflineScreen} from '../Components/Index';
import {getLocation} from "../firebase/getLocation"

const SplashScreen = () => {
  return <ActivityIndicator size="large" color={COLORS.primary} />;
};

const Navigation = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [isConnected, setIsConnectes] = useState(false);
  const getChats = uid => {
    try {
      firestore()
        .collection('userChat')
        .doc(uid)
        .onSnapshot(res => {
          dispatch(getCurrentUserChat(res.data()));
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnectes(state.isConnected);
    });

   const unregister = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        dispatch(isUserExist(userExist.uid));
        dispatch(getUserDetails(userExist.uid));
        getChats(userExist.uid);
        getLocation(userExist.uid)
      } else dispatch(isUserExist(null));
    });
    unregister();
    setTimeout(() => {
      setLoading(false);
    }, 2000);

  return () => unsubscribe();
  }, []);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      backGround: 'transparent',
    },
  };

  if (!isConnected) {
    return <OfflineScreen />;
  }

  return (
    <NavigationContainer theme={theme}>
      {isLoading ? (
        <SplashScreen />
      ) : user !== null ? (
        <MainStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
