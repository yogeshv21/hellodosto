import React from 'react';

import {COLORS, SIZES, SHADOWS} from '../../Theme/Index';
import {assets} from '../../constants/index';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  FocusedStatusBar,
  CircleButton,
  RectButton,
  DetailsDesc,
  DetailsBid,
  SubInfo,
} from '../../Components/Index';
import {scale} from '../../Theme/Theme';

const DetailsHeader = ({param, navigation}) => {
  return (
    <View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
          top: StatusBar.currentHeight + scale(20),
          position: 'absolute',
          zIndex: 2,
        }}>
        <CircleButton
          handelPress={() => navigation.goBack()}
          backgroundColor={'white'}
          color={'black'}
        />
        <TouchableOpacity
          style={{
            height: scale(40),
            width: scale(40),
            borderRadius: SIZES.extraLarge,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
            ...SHADOWS.light,
          }}></TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          height: 373,
        }}>
        <Image
          source={param.image}
          resizeMode="cover"
          style={{height: '100%', width: '100%'}}
        />
      </View>
    </View>
  );
};

const Details = ({route, navigation}) => {
  const {data} = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <FocusedStatusBar backgroundColor="transparent" translucent={true} />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 1,
        }}>
        <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} />
      </View>

      <FlatList
        data={data.bids}
        renderItem={({item}) => {
          return <DetailsBid bid={item} />;
        }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: SIZES.extraLarge * 3}}
        ListHeaderComponent={() => {
          return (
            <>
              <DetailsHeader param={data} navigation={navigation} />
              <SubInfo />
              <View style={{padding: SIZES.font}}>
                <DetailsDesc data={data} />
                {data.bids.length > 0 && (
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: SIZES.medium,
                    }}>
                    Current Bids
                  </Text>
                )}
              </View>
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Details;
