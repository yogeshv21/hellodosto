import React, {useState, useEffect} from 'react';

import {Text, View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {NFTData} from '../../constants/index';
import HomeHeader from '../../Components/HomeHeader';
import {FocusedStatusBar, Chats} from '../../Components/Index';
import NFTcards from '../../Components/NFTcards';
import {COLORS} from '../../Theme/Index';
import { scale, verticalScale } from '../../Theme/Theme';

const Home = () => {
  const [nftData, setNftData] = useState(NFTData);
  
  return (
    <SafeAreaView style={Styles.container}>
      <Chats/>
      <FocusedStatusBar backgroundColor={COLORS.primary}/>
      <View style={{flex: 1}}>
        <View style={{zIndex: 0}}>
          <FlatList
            data={nftData}
            renderItem={({item}) => <NFTcards data={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader />}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
        }}>
        <View
          style={{
            height: verticalScale(240),
            backgroundColor: COLORS.primary,
            borderBottomLeftRadius: scale(50),
            borderBottomRightRadius: scale(50),
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
});
