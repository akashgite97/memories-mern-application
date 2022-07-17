import { configureStore } from "@reduxjs/toolkit";
import postReducer  from './slices/postSlice.js'
import formReducer from  './slices/formSlice.js'
import authReducer from  './slices/authSlice.js'
export const store = configureStore({
    reducer:{
    posts:postReducer,
    form: formReducer,
    auth:authReducer
    },
})