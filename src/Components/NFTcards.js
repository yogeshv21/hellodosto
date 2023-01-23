import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {assets} from "../constants/index"
import { COLORS, SHADOWS, SIZES} from '../Theme/Index'
import { CircleButton, RectButton } from '../Components/Button';
import { SubInfo, Price, Title } from '../Components/SubInfo';
import { scale, verticalScale } from '../Theme/Theme';


function NFTcards({data}) {
    const navigation = useNavigation();
    function navigateToDetails(){
      navigation.navigate('Stack', {screen: "Details", params:{data}})
    }
    
  return (
     <TouchableOpacity activeOpacity={.8} onPress={navigateToDetails} style={{
      backgroundColor: COLORS.white,
      borderRadius: SIZES.font,
      marginBottom: SIZES.extraLarge,
      margin: SIZES.base,
      ...SHADOWS.medium,
      padding: scale(10),
     }}>
      <View style={{height: verticalScale(200), borderRadius: SIZES.font, overflow: "hidden"}}>
          <Image source={data.image} style={{height: "100%", width: "100%"}} resizeMode={"cover"}/>
      </View>
     </TouchableOpacity>
  )
}

export default NFTcards;