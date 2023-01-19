import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import MapView, {Marker} from "react-native-maps";
import {useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native'



function degreesToRadians(angle) {
  return angle * (Math.PI / 180);
}

function kMToLatitudes(km) {
  return km / 110.574;
}

function kMToLongitudes(km, atLatitude) {
  return km * 0.0089831 / Math.cos(degreesToRadians(atLatitude));
}

const Map = ()=>{

  const currentUser = useSelector(state => state.userDetails.userDetails);
  console.log("??????", currentUser.location.latitude);

  const navigation = useNavigation();

  function profileHendler() {
    navigation.navigate("Stack", { screen: 'Profile', params: { data: currentUser } })
  }

  const currentUserLocation = {
    latitude: currentUser.location?.latitude,
    longitude: currentUser.location?.longitude,
    latitudeDelta: kMToLatitudes(1.0),
    longitudeDelta: kMToLongitudes(1.1, currentUser.location.latitude),
  }

  return (
    <View style={styles.container}>
    {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        initialRegion={currentUserLocation}
      >
        <Marker coordinate={currentUserLocation}>
            <TouchableOpacity onPress={() => profileHendler()}>
              <View style={{
                height: 45,
                width: 45,
                borderRadius: 100
              }}>
                <Image source={{ uri: currentUser?.pic }}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 100
                  }}
                />
              </View>
          </TouchableOpacity>
      </Marker>
      </MapView>
    </View>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map