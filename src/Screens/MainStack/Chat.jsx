import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {COLORS, VW} from '../../Theme/Theme';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const Chat = ({route, navigation}) => {
  const currentUser = useSelector(state => state.userDetails.userDetails);
  const user = route.params.user;
  const chatId = route.params.combinedId;
  const [messages, setMessages] = useState();
  const [inputTxt, setInputTxt] = useState("");
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  useEffect(() => {
    try {
      firestore()
        .collection('chats')
        .doc(chatId)
        .onSnapshot(res => {
          setMessages(res.data().messages);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: user.name,
    });
  }, [route]);

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
    setInputTxt('')
  };

  return (
    <View style={{flex: 1,  backgroundColor: '#ddddf773'}}>
      <FlatList 
         data={messages} 
         renderItem={({item})=> 
            <View style={[Styles.msg, item.senderId === currentUser.uid? Styles.msg_rgt: Styles.msg_lft]}>
              <Text style={[Styles.msg_txt, {color: (item.senderId === currentUser.uid?"white": 'black')} ]}>
                  {item.text}
               </Text>
            </View>}
         style={{flex: 1}}/>
      <View style={{flexDirection: 'row', padding: VW(45),backgroundColor: "white", marginTop: 20}}>
        <TextInput
          style={{width: '80%', fontSize: VW(23), backgroundColor: "white"}}
          placeholder="Write Message..."
          onChangeText={(e)=> setInputTxt(e)}
          value={inputTxt}
        />
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
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  msg: {
    width: '70%',
    marginTop: 26,
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
