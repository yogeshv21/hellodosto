import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {FocusedStatusBar, SearchHeader} from '../../Components/Index';
import {COLORS, SHADOWS, SIZES, VH, VW} from '../../Theme/Index';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native'


const OtherUserCard = ({data}) => {
 
  const navigation = useNavigation()
  const profileHandler = (data)=>{
    navigation.navigate('Stack', {screen: "Profile", params:{data:data}})
  }
    
  return (
    <TouchableOpacity style={Styles.cardCont} onPress={()=>profileHandler(data)}>
      <View style={Styles.profileImg}>
      <Image source={{uri: data.pic}} 
           style={{
            height: '100%',
            width: '100%',
            borderRadius: 100
           }}/>
      </View>
      <View style={Styles.nameCont}>
        <Text style={Styles.userName}>{data.name}</Text>
        <Text style={Styles.userEmail}>{data.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

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
            renderItem={({item}) => <OtherUserCard data={item}/>}
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

export default Search;

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
  },
  userEmail: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
});
