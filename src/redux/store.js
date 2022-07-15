import { configureStore } from "@reduxjs/toolkit";
import postReducer  from './slices/postSlice.js'
import formReducer from  './slices/formSlice.js'

export const store = configureStore({
    reducer:{
    posts:postReducer,
    form: formReducer
    },
})