import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../constant/api";
import { API_URL } from "../../constant/constant";

const initialState = {
    details:'',
    isAuthenticated: false,
    isLoading:false,
    error:'',
};


export const signin = createAsyncThunk("users/signin", async (formData) => {
    return API.post(`${API_URL}/user/signin`,{
        email:formData.email,
        password:formData.password
      }).then((res) => res)
  });

  export const signup = createAsyncThunk("users/signup", async (formData) => {
    return API.post(`${API_URL}/user/signup`,{
        firstName:formData.firstName,
        lastName:formData.lastName,
        email:formData.email,
        password:formData.password,
        confirmPassword:formData.confirmPassword,
      }).then((res) => res);
  });
  
const authSlice = createSlice({
  name: "auth",
  initialState:initialState,
  reducers:{
    logout:(state)=>{
        localStorage.clear()
        return {...initialState}
      },
  },
  extraReducers:(builder)=>{
    //signin
    builder.addCase(signin.pending,(state)=>{
      state.isLoading = true
      state.error =''
      state.authData = ''
    })
    builder.addCase(signin.fulfilled,(state, action)=>{
        state.isLoading = true
        state.error =''
        state.details = action.payload.data.result
        state.isAuthenticated = true
        localStorage.setItem('profile',JSON.stringify({...action.payload?.data}))
      })
      builder.addCase(signin.rejected,(state, action)=>{
        state.isLoading = true
        state.authData =''
        state.error = action.error.message
      })
        //signup
      builder.addCase(signup.pending,(state)=>{
        state.isLoading = true
        state.error =''
        state.authData = ''
      })
      builder.addCase(signup.fulfilled,(state, action)=>{
          state.isLoading = true
          state.error =''
          state.authData = action.payload.data
          state.isAuthenticated = true
        })
      builder.addCase(signup.rejected,(state, action)=>{
          state.isLoading = true
          state.authData =''
          state.error = action.error.message
        })
  }
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
