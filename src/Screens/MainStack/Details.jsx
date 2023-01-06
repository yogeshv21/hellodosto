import React from "react";

import { COLORS, SIZES, SHADOWS } from "../../Theme/Index";
import {assets} from "../../constants/index"
import { Text, View, SafeAreaView, Image, StatusBar, FlatList } from "react-native"
import {FocusedStatusBar, CircleButton, RectButton, DetailsDesc, DetailsBid, SubInfo} from '../../Components/Index'

const DetailsHeader = ({param, navigation})=>{
   return(
    <View style={{
        width: '100%',
        height: 373
    }}>
     <Image source={param.image} resizeMode='cover' style={{height: '100%', width: '100%'}}/>
     <CircleButton
      imgUrl ={assets.left} 
      handelPress={()=> navigation.goBack()} 
      top={StatusBar.currentHeight + 10}
      left= {15}
      />
         <CircleButton
      imgUrl ={assets.heart} 
      top={StatusBar.currentHeight + 10}
      right= {15}
      />
    </View>

   )
}

const Details = ({route, navigation})=>{
   const {data} = route.params
    return(
     <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <FocusedStatusBar
         barStyle='dark-content'
         backgroundColor='transparent'
         translucent={true}
        />
        <View style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            paddingVertical: SIZES.font,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            zIndex: 1
        }}>
            <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark}/>
        </View>

        <FlatList 
        data={data.bids}
        renderItem={({item})=>{
            return(
                <DetailsBid bid={item}/>
            )
        }}
        keyExtractor={(item)=>item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: SIZES.extraLarge * 3}}
        ListHeaderComponent={()=>{
            return(
                <>
                    <DetailsHeader param={data} navigation={navigation}/>
                    <SubInfo/>
                    <View style={{padding: SIZES.font}}>
                        <DetailsDesc data={data}/>
                        {data.bids.length > 0 && (
                            <Text 
                             style={{
                                color: COLORS.primary,
                                fontSize: SIZES.medium
                             }}
                            >
                                Current Bids
                            </Text>
                        )}
                    </View>
                </>
            )
        }}
        />
     </SafeAreaView>
    )
};

export default Details;