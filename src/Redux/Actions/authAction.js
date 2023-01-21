import actionType from "../actionType"
import auth from "@react-native-firebase/auth"
import {getUserDetails} from "./userDataAction"
import {getLocation} from "../../firebase/getLocation"

// ================= LOGIN USER ============== //

const requestLogin = ()=>{
    return{
        type: actionType.LOGIN_REQUEST,
    };
};

const loginSuccess = (user)=>{
    return{
        type: actionType.LOGIN_SUCCESS,
        payload: user
    };
};

const loginError = (error)=>{
    return{
        type: actionType.LOGIN_ERROR,
        payload: error
    };
};

export const loginUser = (email, password)=>{
    return (dispatch)=>{
         dispatch(requestLogin());
         auth().signInWithEmailAndPassword(email, password).then((result)=>{
             dispatch(loginSuccess(result.user.uid));
             dispatch(getUserDetails(result.user.uid))
             getLocation(result.user.uid)
         }).catch((err)=>{
             dispatch(loginError("login failed"))
         })
    }
}

// ================= SIGN UP USER ============== //

export const requestSignUp = ()=>{
    return{
        type: actionType.SIGN_UP_REQUEST
    };
};

export const signUpSuccess = (user)=>{
    return{
        type: actionType.SIGN_UP_SUCCESS,
        payload: user
    };
};

export const signUpError = (error)=>{
    return{
        type: actionType.SIGN_UP_ERROR,
        error: error
    };
};


// =============== Update auth state =============== //

export const isUserExist = (user)=>{
    return{
        type: actionType.LOGIN_SUCCESS,
        payload: user
    }
}