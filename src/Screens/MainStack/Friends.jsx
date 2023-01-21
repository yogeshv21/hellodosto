import React, {useState, useEffect} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import {FocusedStatusBar, SearchHeader} from '../../Components/Index';
import {COLORS, SHADOWS, SIZES, VH, VW} from '../../Theme/Index';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native'
import {useSelector} from "react-redux"

const OtherUserCard = ({data}) => {  
  const [loader , setLoader] = useState(true)
  const [userDetails, setUserDetails] = useState()
  const getFriendsDetails = (params) => {
    firestore().collection('users').doc(params).get().then((details)=>{
      setUserDetails(details.data())
      setLoader(false)
    }).catch((err)=>{
    });
  }
  useEffect(()=>{
    getFriendsDetails(data.userId)
  },[])
  const navigation = useNavigation()
  const profileHandler = (params)=>{
    navigation.navigate('Stack', {screen: "Profile", params:{data:params}})
  }

  if(loader){
    return  ''
  }
    
  return (
    <TouchableOpacity style={Styles.cardCont} onPress={()=>profileHandler(userDetails)}>
      <View style={Styles.profileImg}>
      <Image source={{uri: userDetails?.pic}} 
           style={{
            height: '100%',
            width: '100%',
            borderRadius: 100
           }}/>
      </View>
      <View style={Styles.nameCont}>
        <Text style={Styles.userName}>{userDetails?.name}</Text>
        <Text style={Styles.userEmail}>{userDetails?.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Friends = () => { 
  const [loader , setLoader] = useState(true)
  const currentUser = useSelector((state=>state.userDetails.userDetails))
  const [friends, setFrineds] = useState();   
  const getFriends = () => {
    try{
        firestore().collection('users').doc(currentUser.uid).collection('friends').onSnapshot((quarySnap)=>{
        const allUsers = quarySnap.docs.map(docSnap => docSnap.data());
        setFrineds(allUsers)
        setLoader(false)
        });
    }catch(err){}
  };
    useEffect(() => {
        getFriends()
    }, []);

    if(loader){
      return  <ActivityIndicator size="large" color={"transprent"} />
    }
  return (
    <SafeAreaView style={Styles.container}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{flex: 1}}>
        <View style={{zIndex: 0, flex: 1}}>
          <FlatList
            data={friends}
            renderItem={({item}) => <OtherUserCard data={item}/>}
            refreshControl={<RefreshControl refreshing={loader} onRefresh={()=>{
              getFriends()
            }}/>}
            keyExtractor={(item )=> item.userId}
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

export default Friends;

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
    color:"black"
  },
  userEmail: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
});
