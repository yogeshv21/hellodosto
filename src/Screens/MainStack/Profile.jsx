import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {COLORS, SIZES, SHADOWS} from '../../Theme/Index';
import {assets} from '../../constants/index';
import {useDispatch, useSelector} from 'react-redux';
import {isUserExist} from '../../Redux/Actions/authAction';
import firestore from '@react-native-firebase/firestore';
import {FocusedStatusBar, CircleButton} from '../../Components/Index';
import {scale, verticalScale, moderateScale} from '../../Theme/Theme';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

const Profile = ({route, navigation}) => {
  const currentUser = useSelector(state => state.userDetails.userDetails);
  const user = route.params.data;
  const dispatch = useDispatch();
  const [addedFriend, setAddedFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileModalVisible, setprofileModalVisible] = useState(false);
  const [logoutModalVisible, setlogoutModalVisible] = useState(false);

  useEffect(() => {
    isfriend();
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  const handleProfileModal = () => setprofileModalVisible(() => !profileModalVisible);
  const handleLogoutModal = () => setlogoutModalVisible(() => !logoutModalVisible);

  const isfriend = () => {
    firestore()
      .collection('users')
      .doc(currentUser.uid)
      .collection('friends')
      .where('userId', '==', user.uid)
      .get()
      .then(quarySnap => {
        quarySnap.forEach(doc => {
          setAddedFriend(doc.data().userId);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

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

  const handleMessage = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    const res = await firestore()
      .collection('chats')
      .doc(combinedId)
      .get()
      .then(res => res);
    if (!res.exists) {
      console.log(currentUser.uid);
      firestore()
        .collection('chats')
        .doc(combinedId)
        .set({
          messages: [],
        })
        .then(() => {
          firestore()
            .collection('userChat')
            .doc(currentUser.uid)
            .update({
              [combinedId + '.userInfo']: {
                uid: user.uid,
                name: user.name,
                photoURL: user.pic,
                email: user.email
              },
            })
            .then(() => {
              console.log('success');
            })
            .catch(err => {
              console.log(err);
            });

          firestore()
            .collection('userChat')
            .doc(user.uid)
            .update({
              [combinedId + '.userInfo']: {
                uid: currentUser.uid,
                name: currentUser.name,
                photoURL: currentUser.pic,
                email: currentUser.email
              },
            })
            .then(() => {
              console.log('success');
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
      console.log('+++++', combinedId);
      navigation.navigate('Chat', {user, combinedId});
    } else {
      navigation.navigate('Chat', {user, combinedId});
    }
  };

  const DetailsHeader = ({navigation}) => {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
          top: StatusBar.currentHeight,
        }}>
        <CircleButton
          handelPress={() => navigation.goBack()}
          backgroundColor={'white'}
          color={'black'}
        />
        {user.uid === currentUser.uid ? (
          <TouchableOpacity
            onPress={() => handleLogoutModal()}
            style={{
              height: scale(40),
              width: scale(40),
              borderRadius: SIZES.extraLarge,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              ...SHADOWS.light,
            }}>
            <Icon name={'logout'} size={scale(20)} color={'black'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              height: scale(40),
              width: scale(40),
              borderRadius: SIZES.extraLarge,
              backgroundColor: COLORS.white,
              alignItems: 'center',
              justifyContent: 'center',
              ...SHADOWS.light,
            }}></TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size={'small'} />;
  }

  return (
    <SafeAreaView style={Styles.container}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <Modal isVisible={profileModalVisible}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center'}}
          activeOpacity={1}
          onPress={handleProfileModal}>
          <View style={{backgroundColor: 'white', height: '50%', padding: scale(10), borderRadius: scale(10)}}>
            <Image
              source={{uri: user.pic}}
              resizeMode={'cover'}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: scale(10)
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal isVisible={logoutModalVisible}>
          <View style={{backgroundColor: "white", borderRadius: scale(10), padding: scale(20)}}>
             <View style={{alignSelf:"center", alignItems:"center"}}>
              <Icon name={'logout'} size={scale(80)} color={COLORS.primary} />
              <Text style={{fontSize: SIZES.medium, marginTop: scale(10), color: COLORS.primary}}>Do you want to logout ?</Text>
             </View>
             <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: scale(20)}}>
               <TouchableOpacity opa style={[Styles.btn, {borderWidth: scale(1)}]} onPress={logOut}>
                  <Text style={[Styles.modal_txt, {color: COLORS.primary}]}>Yes</Text>
               </TouchableOpacity>
               <TouchableOpacity style={[Styles.btn, {backgroundColor: COLORS.primary}]} onPress={handleLogoutModal}>
                  <Text style={Styles.modal_txt}>Cancle</Text>
               </TouchableOpacity>
             </View>
          </View>
      </Modal>
      <ScrollView style={Styles.scrollView}>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              height: verticalScale(240),
              borderBottomLeftRadius: scale(50),
              borderBottomRightRadius: scale(50),
              backgroundColor: COLORS.primary,
              position: 'relative',
              zIndex: 1,
            }}>
            <DetailsHeader navigation={navigation} />
            <View style={Styles.profileDetails}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={Styles.profileImg}
                onPress={handleProfileModal}
                >
                <Image
                  source={{uri: user.pic}}
                  resizeMode={'cover'}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </TouchableOpacity>
              <View style={{marginTop: scale(10), alignSelf: 'center'}}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: scale(24),
                    color: COLORS.primary,
                    fontWeight: '500',
                  }}>
                  {user.name}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: scale(13),
                    color: COLORS.gray,
                  }}>
                  {user.email}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: scale(20),
                }}>
                {user.uid === currentUser.uid ? (
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: scale(27),
                      paddingVertical: scale(8),
                      backgroundColor: COLORS.primary,
                      borderRadius: SIZES.small,
                      marginHorizontal: scale(5),
                    }}>
                    <Text style={{color: 'white'}}>Edit Profile</Text>
                  </TouchableOpacity>
                ) : addedFriend === null ? (
                  <TouchableOpacity
                    onPress={() => addFriendHendler()}
                    style={{
                      paddingHorizontal: scale(27),
                      paddingVertical: scale(8),
                      backgroundColor: COLORS.primary,
                      borderRadius: SIZES.small,
                      marginHorizontal: scale(5),
                    }}>
                    <Text style={{color: 'white'}}>Follow</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => removeFriendHendler()}
                    style={{
                      paddingHorizontal: scale(27),
                      paddingVertical: scale(8),
                      backgroundColor: COLORS.gray,
                      borderRadius: SIZES.small,
                      marginHorizontal: scale(5),
                    }}>
                    <Text style={{color: 'white'}}>Unfollow</Text>
                  </TouchableOpacity>
                )}

                {user.uid === currentUser.uid ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Friends')}
                    style={{
                      paddingHorizontal: scale(20),
                      paddingVertical: scale(8),
                      borderColor: COLORS.primary,
                      borderRadius: SIZES.small,
                      marginHorizontal: scale(5),
                      borderWidth: 1,
                    }}>
                    <Text style={{color: COLORS.primary}}>Friends</Text>
                  </TouchableOpacity>
                ) : (
                  ''
                )}

                {addedFriend === null ? (
                  ''
                ) : (
                  <TouchableOpacity
                    onPress={() => handleMessage()}
                    style={{
                      paddingHorizontal: scale(20),
                      paddingVertical: scale(8),
                      borderColor: COLORS.primary,
                      borderRadius: SIZES.small,
                      marginHorizontal: scale(5),
                      borderWidth: 1,
                    }}>
                    <Text style={{color: COLORS.primary}}>Message</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.white,
              height: 700,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    zIndex: 0,
  },
  profileDetails: {
    padding: scale(15),
    position: 'absolute',
    height: 300,
    width: '90%',
    backgroundColor: 'white',
    marginTop: '6%',
    ...SHADOWS.medium,
    alignSelf: 'center',
    bottom: '-40%',
    borderRadius: 10,
  },
  profileImg: {
    height: scale(100),
    width: scale(100),
    backgroundColor: COLORS.primary,
    borderRadius: 200,
    borderWidth: 0.5,
    borderColor: COLORS.primary,
    alignSelf: 'center',
    overflow: 'hidden',
  },

  btn:{
    height: scale(34),
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(5)
  },
  modal_txt:{
    fontSize: SIZES.medium + 3,
    color: "white"
  }
});
