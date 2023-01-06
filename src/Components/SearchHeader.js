import React from 'react';
import {View, Image, Text, TextInput, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { COLORS, SIZES } from '../Theme/Index';
import {assets} from '../constants/index'


function SearchHeader({onSearch}) {
  const navigation = useNavigation();
  function profileHendler(){
    navigation.navigate('Profile')
  }
  return (
    <View style={{
      backgroundColor: COLORS.primary,
      padding: SIZES.font
    }}>
       <View style={{
        marginVertical : SIZES.font
       }}>
        <Text  style={{
          color: COLORS.white,
          fontSize: SIZES.extraLarge
        }}>
          Let's Explore The World
        </Text>
       </View>
       <View style={{
        marginTop: SIZES.font
       }}>
            <View style={{
              width: '100%',
              borderRadius: SIZES.font,
              backgroundColor: COLORS.gray,
              flexDirection: 'row',
              alignItems: 'center', 
              paddingHorizontal: SIZES.font,
              paddingVertical: SIZES.font -20
            }}>
              <Image source={assets.search}
               style={{
                height: 20,
                width: 20,
                marginRight: SIZES.base
               }}
              />
               <TextInput placeholder='Search'
               style={{
                flex: 1,
                fontSize: SIZES.large
               }}
               onChangeText={onSearch}
               />
            </View>
       </View>
    </View>
  )
}

export default SearchHeader;



