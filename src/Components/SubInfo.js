import React from "react";

import { View, Text, Image } from "react-native";
import { SIZES, FONTS, COLORS, SHADOWS } from "../Theme/Index";
import {assets} from "../constants/index"

export const Title =({title, subTitle, titleSize, subTitleSize})=>{
   return(
    <View>
        <Text style={{
            fontSize: titleSize,
            color: COLORS.primary,
        }}>
            {title}
        </Text>
        <Text style={{
            fontSize: subTitleSize,
            color: COLORS.gray,
        }}>
            {subTitle}
        </Text>
    </View>
   )
}

export const Price =({price})=>{
    return(
     <View>
         <Text style={{
            fontSize: SIZES.large, 
            color: COLORS.primary
         }}>
             $ {price}
         </Text>
     </View>
    )
 }

 export const EndDate =()=>{
    return(
     <View style={{
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: '50%',
     }}>
         <Text style={{
            fontSize: SIZES.small,
            color: COLORS.primary
         }}>
             Starts From
         </Text>
         <Text style={{
            fontSize: SIZES.large,
            color: COLORS.primary
         }}>
             10 July
         </Text>
     </View>
    )
 }

 export const ImageCamp =({imgUrl, index})=>{
    return(
     <Image
     source={imgUrl}
     resizeMode={'contain'}
     style={{
        height: 48,
        width: 48,
        marginLeft: index === 0 ? 0 : -SIZES.font
     }}
     />
    )
 }

 export const People =()=>{
    return(
     <View style={{flexDirection: 'row'}}>
         {[assets.person02, assets.person03, assets.person04].map((imgUrl, index)=>{
           return(
            <ImageCamp key={index} imgUrl={imgUrl}/>
           )
         })}
     </View>
    )
 }

 export const SubInfo=()=>{
    return(
     <View style={{
        width: '100%',
        paddingHorizontal: SIZES.extraLarge,
        marginTop: -SIZES.extraLarge,
        flexDirection: 'row',
        justifyContent: "flex-end"
     }}>
         <EndDate/>
     </View>
    )
 }