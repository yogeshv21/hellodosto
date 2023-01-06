import {View, Text, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

import {COLORS, SHADOWS, VW} from '../../Theme/Index';
const Search = ({navigation}) => {
  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    const quarySnap = await firestore().collection('users').get();
    const allUsers = quarySnap.docs.map(docSnap => docSnap.data());
    console.log('=====All Users======', allUsers);
    setUsers(allUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const RenderCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Chat', {
            name: item.name,
            uid: item.uid,
          })
        }>
        <View style={styles.mycard}>
          <Image source={{uri: item.pic}} style={styles.img} />
          <View>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center', padding: 10}}>
      <FlatList
        data={users}
        renderItem={({item}) => {
          return <RenderCard item={item} />;
        }}
        keyExtractor={item => item.uid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img:{width:60,height:60,borderRadius:30,backgroundColor:COLORS.primary},
  text:{
      fontSize:18,
      marginLeft:15,
  },
  mycard:{
      flexDirection:"row",
      margin:10,
      padding:10,
      backgroundColor:"white",
      borderBottomColor:'grey',
      ...SHADOWS.medium
  },
  fab: {
   position: 'absolute',
   margin: 16,
   right: 0,
   bottom: 0,
   backgroundColor:"white"
 },
});

export default Search;
