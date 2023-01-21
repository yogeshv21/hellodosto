import { View, Text, SafeAreaView, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {offlineImg} from "../assets/images/index"
import { VW } from '../Theme/Theme'

const OfflineScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor:"#FCEBD8", flex: 1}}>
      <StatusBar barStyle='dark-content'
         backgroundColor='transparent'
         translucent={true}/>
    <View style={Styles.txt_cont}>
      <Text style={Styles.text}>It Looks Like</Text>
      <Text style={Styles.textTwo}>You Are Offline !</Text>
    </View>
    <View style={Styles.img_cont}>
        <Image source={offlineImg} style={Styles.img} resizeMode={"contain"} />
    </View> 
    <TouchableOpacity style={Styles.button}>
        <Text style={Styles.btn_txt}>Retry</Text>
    </TouchableOpacity>
    </SafeAreaView>
  )
}

export default OfflineScreen;

const Styles =  StyleSheet.create({
    img_cont:{
        height: "41%",
        width: "90%",
        alignSelf: "center",
    },
    img:{
        height: "100%",
        width: "100%"
    },
    txt_cont:{
        paddingTop: "20%",
        paddingHorizontal: "8%",
        height: "30%",
        justifyContent:"center"
    },
    text:{
        fontSize: VW(11),
        color:"#93976D"
    },
    textTwo:{
        fontSize: VW(9),
        fontWeight: "700",
        color:"#F99590"
    },
    button:{
        height: 40,
        width: "40%",
        backgroundColor:"#F99590",
        borderRadius: 100,
        alignSelf: "center",
        alignItems:"center",
        justifyContent:"center",
        marginTop: "15%"
    },
    btn_txt:{
       color: "white",
       fontSize: VW(23),
       fontWeight: "700",
    }
})