import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  StatusBar,
  FlatList,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {COLORS, SIZES, SHADOWS} from '../../Theme/Index';
import {assets} from '../../constants/index';
import {useDispatch, useSelector} from 'react-redux';
import {isUserExist} from '../../Redux/Actions/authAction';
import firestore from '@react-native-firebase/firestore';
import {
  FocusedStatusBar,
  CircleButton,
  RectButton,
  DetailsDesc,
  DetailsBid,
  SubInfo,
} from '../../Components/Index';

const Profile = ({route, navigation}) => {
  const currentUser = useSelector(state => state.userDetails.userDetails);
  const user = route.params.data;
  const dispatch = useDispatch();
  const [addedFriend, setAddedFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const isfriend = () => {
    firestore()
      .collection('users')
      .doc(currentUser.uid)
      .collection('friends')
      .where('userId', '==', user.uid)
      .get()
      .then(quarySnap => {
        quarySnap.forEach(doc => {
          doc.data().userId
            ? console.log('mil gaya')
            : console.log('nahi mila');
          setAddedFriend(doc.data().userId);
          setLoading(false);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    isfriend();
  }, []);

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    dispatch(isUserExist(null));
  };

  const addFriendHendler = async () => {
    setLoading(true);
    await firestore()
      .collection('users')
      .doc(currentUser.uid)
      .collection('friends')
      .doc(user.uid)
      .set({
        userId: user.uid,
      })
      .then(() => {
        isfriend();
        setLoading(false);
      });
  };
  const removeFriendHendler = async () => {
    setLoading(true);
    await firestore()
      .collection('users')
      .doc(currentUser.uid)
      .collection('friends')
      .doc(user.uid)
      .delete()
      .then(() => {
        setAddedFriend(null);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error removing document:', error);
      });
  };

  const handleMessage = async()=>{
     //check whether the group(chats in firestore) exists, if not create
     const combinedId =
     currentUser.uid > user.uid
       ? currentUser.uid + user.uid
       : user.uid + currentUser.uid;
        const res = await firestore().collection("chats").doc(combinedId).get().then((res)=> res);
        if(!res.exists){
           console.log(currentUser.uid);
           firestore().collection("chats").doc(combinedId).set({
            messages: []
          }).then(()=>{
            firestore().collection("userChat").doc(currentUser.uid).update({
              [combinedId + ".userInfo"]: {
                uid: user.uid,
                name: user.name,
                photoURL: user.pic,
              },
            }).then(()=>{
              console.log("success");
            }).catch((err)=>{
               console.log(err);
            })

            firestore().collection("userChat").doc(user.uid).update({
              [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                name: currentUser.name,
                photoURL: currentUser.pic,
              },
            }).then(()=>{
              console.log("success");
            }).catch((err)=>{
               console.log(err);
            })
          }).catch((err)=>{
            console.log(err);
          });
          navigation.navigate('Chat', {user, combinedId})
        }else{
          navigation.navigate('Chat', {user, combinedId})
        }
  }

  if (loading) {
    return <ActivityIndicator size={'small'} />;
  }

  return (
    <View>
      <Text style={{color:"black"}}>Profile</Text>
      <Text style={{color:"black"}}>Name - {user.name}</Text>
      <Text style={{color:"black"}}>Name - {user.email}</Text>
      <View style={{height: 200, width: 200}}>
        <Image
          source={{uri: user.pic}}
          resizeMode={'cover'}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </View>
      {user.uid === currentUser.uid ? (
        <Button title="Log out" onPress={() => logOut()}></Button>
      ) : (
        ''
      )}
      {user.uid === currentUser.uid ? (
        <Button title="Edit Profile" color="black"></Button>
      ) : (
        ''
      )}
      {user.uid === currentUser.uid ? (
        ''
      ) : addedFriend === null ? (
        <Button
          title="Add Friend"
          color="green"
          onPress={() => addFriendHendler()}></Button>
      ) : (
        <Button
          title="Remove Friend"
          color="gray"
          onPress={() => removeFriendHendler()}></Button>
      )}
      {addedFriend === null ? (
        ''
      ) : (
        <Button
          title="Message"
          color="blue"
          onPress={() => handleMessage()}></Button>
      )}
    </View>
  );
};

// const DetailsHeader = ({param, navigation}) => {
//   return (
//     <View
//       style={{
//         width: '100%',
//         height: 373,
//       }}>
//       <Image
//         source={{uri: param.pic}}
//         resizeMode="contain"
//         style={{height: '100%', width: '100%'}}
//       />
//       <CircleButton
//         imgUrl={assets.left}
//         handelPress={() => navigation.goBack()}
//         top={StatusBar.currentHeight + 10}
//         left={15}
//       />
//       <CircleButton
//         imgUrl={assets.heart}
//         top={StatusBar.currentHeight + 10}
//         right={15}
//       />
//     </View>
//   );
// };

// const Profile2 = ({route, navigation}) => {
//   const currentUser = useSelector(state => state.userDetails.userDetails);
//   const user = route.params.data;
//   const dispatch = useDispatch();
//   const [addedFriend, setAddedFriend] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const isfriend = () => {
//     firestore()
//       .collection('users')
//       .doc(currentUser.uid)
//       .collection('friends')
//       .where('userId', '==', user.uid)
//       .get()
//       .then(quarySnap => {
//         quarySnap.forEach(doc => {
//           doc.data().userId
//             ? console.log('mil gaya')
//             : console.log('nahi mila');
//           setAddedFriend(doc.data().userId);
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     isfriend();
//     setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const logOut = () => {
//     auth()
//       .signOut()
//       .then(() => console.log('User signed out!'));
//     dispatch(isUserExist(null));
//   };

//   const addFriendHendler = async () => {
//     setLoading(true);
//     await firestore()
//       .collection('users')
//       .doc(currentUser.uid)
//       .collection('friends')
//       .doc(user.uid)
//       .set({
//         userId: user.uid,
//       })
//       .then(() => {
//         isfriend();
//         setLoading(false);
//       });
//   };
//   const removeFriendHendler = async () => {
//     setLoading(true);
//     await firestore()
//       .collection('users')
//       .doc(currentUser.uid)
//       .collection('friends')
//       .doc(user.uid)
//       .delete()
//       .then(() => {
//         setAddedFriend(null);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.log('Error removing document:', error);
//       });
//   };

//   if (loading) {
//     return <ActivityIndicator size={'small'} />;
//   }
//   const {data} = route.params;
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
//       <FocusedStatusBar
//         barStyle="dark-content"
//         backgroundColor="transparent"
//         translucent={true}
//       />
//       <View
//         style={{
//           width: '100%',
//           position: 'absolute',
//           bottom: 0,
//           paddingVertical: SIZES.font,
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: 'rgba(255, 255, 255, 0.5)',
//           zIndex: 1,
//         }}>
//         <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} />
//       </View>

//       <FlatList
//         data={data.bids}
//         renderItem={({item}) => {
//           return <DetailsBid bid={item} />;
//         }}
//         keyExtractor={item => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{paddingBottom: SIZES.extraLarge * 3}}
//         ListHeaderComponent={() => {
//           return (
//             <>
//               <DetailsHeader param={user} navigation={navigation} />
//               <SubInfo />
//               <View style={{padding: SIZES.font}}>
//                 <Text
//                   style={{
//                     color: COLORS.primary,
//                     fontSize: SIZES.medium,
//                   }}>
//                   Current Bids
//                 </Text>
//               </View>
//             </>
//           );
//         }}
//       />
//     </SafeAreaView>
//   );
// };

export default Profile;
