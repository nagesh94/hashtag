import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser=createAsyncThunk('user/fetchUser',

    async () => {
        try {
            console.log("hello")
          const url = 'http://localhost:8000/api/v1/users/loggeduser'
          const token = localStorage.getItem('token')
        
          const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
            
  
          })
         
          console.log(response) 
          
          return response.data.user
          
        } catch (err) {
          console.log(err.response)
        }
      }

)
export const fetchallUser=createAsyncThunk('users/fetchallUser',

    async () => {
        try {
            console.log("hello")
          const url = 'http://localhost:8000/api/v1/users/'
          const token = localStorage.getItem('token')
        
          const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
            
  
          })
         
          console.log(response) 
          
          return response.data.users
          
        } catch (err) {
          console.log(err.response)
        }
      }

)



const userSlice=createSlice({
    name:"user",
    initialState:{data:[],data2:[]},
    reducers:{},
    extraReducers:{
        [fetchUser.pending]:()=>{
            console.log("pending....")
        },
        [fetchUser.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,data:payload}
        },
        [fetchallUser.pending]:()=>{
            console.log("pending....")
        },
        [fetchallUser.fulfilled]:(state,{payload})=>
        {   
            console.log("success")
            return {...state,data2:payload}
        },
       
    }
})

export  default userSlice.reducer;