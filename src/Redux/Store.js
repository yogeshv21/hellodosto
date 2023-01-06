import {configureStore, applyMiddleware} from '@reduxjs/toolkit';
import userReducer from './Reducers/auth';
import userDetailsReducer from './Reducers/userDetails';
import currentUserChatReducer from './Reducers/currentUserChats';
import thunkMiddleware from "redux-thunk";


const store = configureStore(
    {
        reducer:{
            user: userReducer,
            userDetails: userDetailsReducer,
            currentUserChats: currentUserChatReducer
        }
    },
    applyMiddleware(thunkMiddleware)
)

export default store