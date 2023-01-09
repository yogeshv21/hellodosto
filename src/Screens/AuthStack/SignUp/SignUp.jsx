import React,{useState} from 'react'
import { View, Text ,Image,StyleSheet,TouchableOpacity,ActivityIndicator,ScrollView} from 'react-native'
import { TextInput,Button } from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {Logo} from '../../../assets/onboarding/Images';
import {Header, FocusedStatusBar} from '../../../Components/Index'
import styles from './Style';
import { COLORS } from '../../../Theme/Theme';
import {signUpError, signUpSuccess, requestSignUp} from "../../../Redux/Actions/authAction"
import {useDispatch, useSelector} from "react-redux"

export default function SignUp({navigation}) {
    const dispatch = useDispatch();
    const {loading} = useSelector((state)=>state.user)

    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [image,setImage] = useState(null)
    const [showNext,setShowNext] = useState(false)
    

    if(loading){
        return  <ActivityIndicator size="large"  color={COLORS.primary} />
    }
    const userSignup = async ()=>{
        dispatch(requestSignUp)
        if(!email || !password || !image|| !name){
               alert("please add all the field")
               return 
        }
        try{
          const result =  await auth().createUserWithEmailAndPassword(email,password)
            firestore().collection('users').doc(result.user.uid).set({
                name:name,
                email:result.user.email,
                uid:result.user.uid,
                pic:image
            }).then(()=>{
                dispatch(signUpSuccess(result.user.uid))
            })  
            firestore().collection('userChat').doc(result.user.uid).set({});
        }catch(err){
            dispatch(signUpError(err))
            alert("something went wrong")
        }
    }
    const pickImageAndUpload = ()=>{
        launchImageLibrary({quality:0.5},(fileobj)=>{
         const uploadTask =  storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.assets[0].uri)
                uploadTask.on('state_changed', 
                 (snapshot) => {
  
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress==100) alert('image uploaded')
                    
                }, 
                (error) => {
                    alert("error uploading image")
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setImage(downloadURL)
                    });
                }
                );
        })
    }
    return (
        <View  style={{paddingHorizontal: '5%', paddingVertical: '13%', flex: 1}}>
             <FocusedStatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
              />
             <Header  screen={"Sign Up"} toscreen={'Login'} arrow={true}/>
            <ScrollView style={styles.box2}>
                <View style={styles.box1}>
                    <Image style={styles.img} source={Logo} />
                </View>
                {!showNext && 
                <>
                 <TextInput
                  style={styles.inp_margin}
                 label="Email"
                 value={email}
                 onChangeText={(text)=>setEmail(text)}
                 mode="outlined"
                />
                <TextInput
                 style={styles.inp_margin}
                 label="password"
                 mode="outlined"
                 value={password}
                 onChangeText={(text)=>setPassword(text)}
                 secureTextEntry
                />
                </>
                }
               
               {showNext ?
                <>
                 <TextInput
                  style={styles.inp_margin}
                 label="Name"
                 value={name}
                 onChangeText={(text)=>setName(text)}
                 mode="outlined"
                />
                <Button
                style={styles.inp_margin}
                mode="contained"
                onPress={()=>pickImageAndUpload()}
                >Select profile pic</Button>
                <Button
                 style={styles.inp_margin}
                mode="contained"
                disabled={image?false:true}
                onPress={()=>userSignup()}
                >Signup</Button>
                <Button
                style={[styles.inp_margin]}
                mode="contained"
                onPress={()=>setShowNext(false)}
                >Previous</Button>
                </>
                :
                 <Button
                 style={styles.inp_margin}
                mode="contained"
                onPress={()=>setShowNext(true)}
                >Next</Button>
                }

              <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={{textAlign:"center", marginTop: 10, color: "black"}}>Already have an account ?</Text></TouchableOpacity>
            </ScrollView>
        </View>
    )
}
