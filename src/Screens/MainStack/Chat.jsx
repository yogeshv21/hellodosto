import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {COLORS, VW} from '../../Theme/Theme';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const Chat = ({route, navigation}) => {
  const currentUser = useSelector(state => state.userDetails.userDetails);
  const user = route.params.user;
  const chatId = route.params.combinedId;
  const [messages, setMessages] = useState(null);
  const [inputTxt, setInputTxt] = useState('');
  const [inputField, setInputField] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    try {
      firestore()
        .collection('chats')
        .doc(chatId)
        .onSnapshot(res => {
          setMessages(res.data().messages);
         console.log('=========', res.data().messages[0]);
        });
      isfriend();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: user.name,
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Stack', {
              screen: 'Profile',
              params: {
                data: {name: user.name, pic: user.photoURL, uid: user.uid},
              },
            })
          }
          title={user.name}>
          <View
            style={{
              height: VW(10),
              width: VW(10),
              borderRadius: 200,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: user.photoURL}}
              resizeMode={'cover'}
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          </View>
        </TouchableOpacity>
      ),
    });
  }, [route]);

  const isfriend = () => {
    firestore()
      .collection('users')
      .doc(currentUser.uid)
      .collection('friends')
      .where('userId', '==', user.uid)
      .onSnapshot(quarySnap => {
        quarySnap.forEach(doc => {
          if (doc.data().userId === user.uid) {
            setInputField(true);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSend = () => {
    try {
      firestore()
        .collection('chats')
        .doc(chatId)
        .update({
          messages: firestore.FieldValue.arrayUnion({
            text: inputTxt,
            senderId: currentUser.uid,
            date: firestore.Timestamp.now(),
          }),
        });
    } catch (err) {
      console.log(err);
    }
    setInputTxt('');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ddddf773'}}>
      {messages !== null ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ref={it => (scrollViewRef.current = it)}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({animated: true})
          }
          onLayout={() => scrollViewRef.current?.scrollToEnd({animated: true})}
          data={messages}
          renderItem={({item}) => (
            item.senderId === currentUser.uid?
            <View style={{flexDirection:"row-reverse", alignSelf:"flex-end", marginTop: 26}}>
              <TouchableOpacity
               style={{alignSelf:"flex-end",  marginRight: 15}}
                onPress={() =>
                  navigation.navigate('Stack', {
                    screen: 'Profile',
                    params: {
                      data: currentUser,
                    },
                  })
                }
                title={user.name}>
                <View
                  style={{
                    height: VW(14),
                    width: VW(14),
                    borderRadius: 200,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={{uri: currentUser.pic}}
                    resizeMode={'cover'}
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={[
                  Styles.msg, Styles.msg_rgt     
                ]}>
                <Text
                  style={[
                    Styles.msg_txt,
                    {
                      color:'white',
                    },
                  ]}>
                  {item.text}
                </Text>
              </View>
            </View>:
             <View style={{flexDirection:"row", alignSelf:"flex-start",  marginTop: 26,}}>
             <TouchableOpacity
              style={{alignSelf:"flex-start", marginLeft: 15}}
               onPress={() =>
                 navigation.navigate('Stack', {
                   screen: 'Profile',
                   params: {
                     data: {
                       name: user.name,
                       pic: user.photoURL,
                       uid: user.uid,
                     },
                   },
                 })
               }
               title={user.name}>
               <View
                 style={{
                    height: VW(14),
                    width: VW(14),
                   borderRadius: 200,
                   overflow: 'hidden',
                 }}>
                 <Image
                   source={{uri: user.photoURL}}
                   resizeMode={'cover'}
                   style={{
                     height: '100%',
                     width: '100%',
                   }}
                 />
               </View>
             </TouchableOpacity>
             <View
               style={[
                 Styles.msg, Styles.msg_lft    
               ]}>
               <Text
                 style={[
                   Styles.msg_txt,
                   {
                     color:'black',
                   },
                 ]}>
                 {item.text}
               </Text>
             </View>
           </View>
          )}
          style={{flex: 1, marginBottom: 20}}
        />
      ) : (
        ''
      )}
      {inputField ? (
        <View
          style={{
            flexDirection: 'row',
            padding: VW(45),
            backgroundColor: 'white',
          }}>
          <TextInput
            style={{
              width: '80%',
              fontSize: VW(23),
              backgroundColor: 'white',
              color: 'black',
            }}
            placeholder="Write Message..."
            onChangeText={e => setInputTxt(e)}
            value={inputTxt}
            placeholderTextColor={'black'}
          />
          {inputTxt !== '' ? (
            <TouchableOpacity
              onPress={() => handleSend()}
              style={{
                width: '20%',
                backgroundColor: COLORS.primary,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontSize: VW(28)}}>Send</Text>
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>
      ) : (
        ''
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  msg: {
    paddingVertical: VW(40),
    borderTopEndRadius: VW(40),
    borderBottomStartRadius: VW(40),
  },
  msg_txt: {
    fontSize: VW(27),
  },
  msg_lft: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.white,
    marginLeft: 10,
    paddingLeft: VW(20),
    paddingRight: VW(40),
    borderBottomEndRadius: VW(40),
  },
  msg_rgt: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    marginRight: 10,
    paddingLeft: VW(40),
    paddingRight: VW(20),
    borderTopStartRadius: VW(40),
  },
});

export default Chat;
