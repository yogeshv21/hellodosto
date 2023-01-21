import React, {useState, useEffect} from 'react';

import { Text, View, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import {FocusedStatusBar} from '../../Components/Index';
import {COLORS, SHADOWS, SIZES, VH, VW} from '../../Theme/Index';

import firestore from '@react-native-firebase/firestore';

import {useNavigation} from '@react-navigation/native';

import {useSelector} from 'react-redux';

const OtherUserCard = ({data}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Chat', {
          user: data[1].userInfo,
          combinedId: data[0],
        });
      }}
      style={Styles.cardCont}>
      <View style={Styles.profileImg}>
        <Image
          source={{uri: data[1].userInfo.photoURL}}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 100,
          }}
        />
      </View>
      <View style={Styles.nameCont}>
        <Text style={Styles.userName}>{data[1].userInfo.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ChatUsers = () => {

  const currentUser = useSelector(state => state.userDetails.userDetails);

  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    try {
      const users = [];
      firestore()
        .collection('userChat')
        .doc(currentUser.uid)
        .onSnapshot(data => {
         Object.entries(data.data())
            .forEach(chat => {
              users.push(chat);
            });
          if (users !== []) {
            setChatUsers(users);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  
  return (
    <SafeAreaView style={Styles.container}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{flex: 1}}>
        <View style={{zIndex: 0, flex: 1}}>
          <FlatList
            data={chatUsers}
            renderItem={({item}) => <OtherUserCard data={item} />}
            keyExtractor={item => item[0]}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}>
        <View
          style={{
            height: 300,
            backgroundColor: COLORS.primary,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatUsers;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cardCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    ...SHADOWS.light,
    marginTop: VW(10),
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: VH(90),
  },

  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
  },

  nameCont: {
    width: '70%',
    height: '100%',
  },
  userName: {
    fontSize: SIZES.large + 1,
    fontWeight: '500',
    marginTop: '4%',
    color: 'black',
  },
  userEmail: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
});
