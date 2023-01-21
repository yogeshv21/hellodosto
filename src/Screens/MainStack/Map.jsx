import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

function degreesToRadians(angle) {
  return angle * (Math.PI / 180);
}

function kMToLatitudes(km) {
  return km / 110.574;
}

function kMToLongitudes(km, atLatitude) {
  return (km * 0.0089831) / Math.cos(degreesToRadians(atLatitude));
}

const Map = () => {
  const currentUser = useSelector(state => state.userDetails.userDetails);
  const [loader, setLoader] = useState(true);
  const [friendsDetails, setFriendsDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getFriends();
  }, []);

  function profileHendler() {
    navigation.navigate('Stack', {
      screen: 'Profile',
      params: { data: currentUser },
    });
  }

  const getFriends = async () => {
    try {
      await firestore()
        .collection('users')
        .orderBy('location', 'asc')
        .get()
        .then(quarySnap => {
          const allUsers = quarySnap.docs.map(docSnap => docSnap.data());
          setFriendsDetails(allUsers);
          setLoader(false);
        });
    } catch (err) { }
  };

  const getFriendsDetails = params => {
    try {
      firestore()
        .collection('users')
        .doc(params)
        .get()
        .then(details => details.data());
    } catch (err) {
      console.log(err);
    }
  };

  const currentUserLocation = {
    latitude: currentUser.location?.latitude,
    longitude: currentUser.location?.longitude,
    latitudeDelta: kMToLatitudes(1.0),
    longitudeDelta: kMToLongitudes(1.1, currentUser.location.latitude),
  };

  const MapMarkers = () => {
    return friendsDetails.map((allUsers) =>
      <Marker
        coordinate={{
          latitude: allUsers.location.latitude,
          longitude: allUsers.location.longitude,
          latitudeDelta: kMToLatitudes(1.0),
          longitudeDelta: kMToLongitudes(1.1, allUsers.location.latitude),
        }}
        key={allUsers.uid}
        >
        <TouchableOpacity onPress={() => profileHendler()}>
          <View
            style={{
              height: 45,
              width: 45,
              borderRadius: 100,
            }}>
            <Image
              source={{ uri: allUsers.pic }}
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 100,
              }}
            />
          </View>
        </TouchableOpacity>
      </Marker>
    )
  }

  if (loader) {
    return <ActivityIndicator size={'small'} />;
  } else {
    return (
      <View style={styles.container}>
        {/*Render our MapView*/}
        <MapView
          style={styles.map}
          //specify our coordinates.
          initialRegion={currentUserLocation}>
          {/*Current user marker*/}
             <MapMarkers/>
          {/*Friends markers*/}
        </MapView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
