import React, {useState, useEffect} from 'react';

import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import {FocusedStatusBar, SearchHeader, OtherUsersCard} from '../../Components/Index';
import {COLORS} from '../../Theme/Index';
import firestore from '@react-native-firebase/firestore';
import { scale, verticalScale } from '../../Theme/Theme';

const Search = () => { 
  const [users, setUsers] = useState();
  const [search, setSearch] = useState(users);

  const getUsers = async () => {
    const quarySnap = await firestore().collection('users').get();
    const allUsers = quarySnap.docs.map(docSnap => docSnap.data());
    setUsers(allUsers);
    setSearch(allUsers);
  };

    useEffect(() => {
        getUsers();
    }, []);

  const handleSearch = value => {
    if (!value.length) return setUsers(search);

    const filterData = users.filter(item => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });

    if (filterData.length) {
      setUsers(filterData);
    } else {
      setUsers(users);
    }
  };
  return (
    <SafeAreaView style={Styles.container}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{flex: 1}}>
        <View style={{zIndex: 0}}>
          <FlatList
            data={users}
            renderItem={({item}) => <OtherUsersCard data={item}/>}
            keyExtractor={(item )=> item.uid}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<SearchHeader onSearch={handleSearch} />}
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
            height: verticalScale(240),
            backgroundColor: COLORS.primary,
            borderBottomLeftRadius: scale(50),
            borderBottomRightRadius: scale(50),
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

export default Search;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});
