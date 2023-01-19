import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity} from 'react-native'
import { COLORS, SIZES } from '../Theme/Index';
import { assets } from "../constants/index"
import { useNavigation } from '@react-navigation/native'
import { useSelector } from "react-redux"

function HomeHeader() {
  const currentUser = useSelector((state => state.userDetails.userDetails))

  const navigation = useNavigation();

  function profileHendler() {
    navigation.navigate("Stack", { screen: 'Profile', params: { data: currentUser } })
  }

  return (
    <View style={{
      backgroundColor: COLORS.primary,
      padding: SIZES.font
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
      
      <View style={{
        marginVertical: SIZES.font
      }}>

        <Text style={{
          color: COLORS.gray,
          fontSize: SIZES.medium
        }}>
          Hello, {currentUser.name}
        </Text>
        <Text style={{
          color: COLORS.white,
          fontSize: SIZES.extraLarge
        }}>
          Here Today's Feeds
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Stack", { screen: 'Map'})}>
          <View style={{
            height: 45,
            width: 45,
            borderRadius: 100,
            backgroundColor:"green"
          }}>
          </View>
      </TouchableOpacity>
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
      </View>
    </View>
  )
}

export default HomeHeader;



