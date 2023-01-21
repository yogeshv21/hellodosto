import React from "react";

import { View, TouchableOpacity, Image, Text, Pressable } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../Theme/Index";

export const CircleButton = (props)=>{
    return (
        <TouchableOpacity style={{
           height: 40,
           width: 40,
           borderRadius: SIZES.extraLarge,
           backgroundColor: COLORS.white,
           alignItems: 'center',
           justifyContent: 'center',
           ...props,
           ...SHADOWS.light
        }}
        onPress={props.handelPress}
        >
           <Image source={props.imgUrl} resizeMode={'contain'} 
           style={{
              height: 24,
              width: 24
           }}
           />
        </TouchableOpacity>
    )
}

export const RectButton = ({minWidth, handlePress,  fontSize, props})=>{
  return(
   <Pressable style={{
      // height: 40,
      width: minWidth,
      borderRadius: SIZES.extraLarge,
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      justifyContent: 'center',
      padding: SIZES.small,
      ...props
   }}
    onPress={handlePress}
   >
      <Text style={{fontSize: fontSize, color: COLORS.white}}>View Plane</Text>
   </Pressable>
  )
}