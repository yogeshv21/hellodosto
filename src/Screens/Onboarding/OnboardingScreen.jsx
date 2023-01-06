import React from 'react'

import { Image, SafeAreaView} from 'react-native'
import {FocusedStatusBar} from '../../Components/Index'

import {Onboarding1, Onboarding2, Onboarding3} from '../../assets/onboarding/Images'

import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {

  const doneBtnHandler = async ()=>{
    navigation.replace('Login')
  }

  const skipBtnHandler = async ()=>{
    navigation.replace('Login')
  }

  return(
   <SafeAreaView style={{flex: 1}}>
    <FocusedStatusBar 
       barStyle='dark-content'
       backgroundColor='transparent'
       translucent={true}
    />
    <Onboarding
        bottomBarHighlight= {false} 
        bottomBarHeight={80}
        onDone={doneBtnHandler}
        onSkip={skipBtnHandler}
        pages={[
            {
            backgroundColor: '#a6e4d0',
            image: <Image source={Onboarding1} />,
            title: 'Make Friends',
            subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
              backgroundColor: '#fdeb93',
              image: <Image source={Onboarding2} />,
              title: 'Chat with your friends',
              subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
              backgroundColor: '#e9bcbe',
              image: <Image source={Onboarding3} />,
              title: 'Near by Friends',
              subtitle: 'Done with React Native Onboarding Swiper',
            }
        ]}
    />
   </SafeAreaView>
  );
}

export default OnboardingScreen