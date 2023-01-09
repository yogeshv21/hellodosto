import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Logo} from '../../../assets/onboarding/Images';
import {Header, FocusedStatusBar} from '../../../Components/Index';
import {COLORS} from '../../../Theme/Theme';
import styles from './Style';
import {loginUser} from '../../../Redux/Actions/authAction';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';

export default function LogIn({navigation}) {
  const dispatch = useDispatch();
  const {loading} = useSelector(state=>state.user)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = async () => {
    if (!email || !password) {
      alert('please add all the field');
      return;
    }
    dispatch(loginUser(email, password))
  };

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }
  
  return (
    <View style={{paddingHorizontal: '5%', paddingVertical: '13%', flex: 1}}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Header screen={'Log In'} arrow={false} />
      <ScrollView style={styles.box2} showsVerticalScrollIndicator={false}>
        <View style={styles.box1}>
          <Image style={styles.img} source={Logo} />
        </View>
        <TextInput
          style={styles.inp_margin}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
        />
        <TextInput
          style={styles.inp_margin}
          label="password"
          mode="outlined"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Button
          style={styles.inp_margin}
          mode="contained"
          onPress={() => userLogin()}>
          Login
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{textAlign: 'center', marginTop: 10, color:"black"}}>
            Dont have an account ?
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
