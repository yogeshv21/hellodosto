import React from "react";

import { View, TouchableOpacity, Image, Text, Pressable } from "react-native";
import  Icon from "react-native-vector-icons/Entypo";
import { COLORS, SHADOWS, SIZES } from "../Theme/Index";
import { scale } from "../Theme/Theme";

export const CircleButton = (props)=>{
    return (
        <TouchableOpacity style={{
            height: scale(40),
            width: scale(40),
           borderRadius: SIZES.extraLarge,
           backgroundColor: props.backgroundColor,
           alignItems: 'center',
           justifyContent: 'center',
           ...props,
           ...SHADOWS.light
        }}
        onPress={props.handelPress}
        >
           <Icon name={'chevron-small-left'} size={scale(32)} color={props.color} />
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