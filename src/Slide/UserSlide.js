import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import User from 'API/User';

export const userLogin = createAsyncThunk('user', async (data) => {
   let results;
   await User.login(data)
      .then(async (success) => {
         localStorage.setItem('token', success.data.token);
         localStorage.setItem('tokenType', success.data.tokenType);
         const infoUser = await User.getByJWT(success.data);
         localStorage.setItem('infoUser', JSON.stringify(infoUser.data));
         results = {
            userToken: success.data,
            infoUser: infoUser.data,
         };
      })
      .catch((error) => {
         console.log(error);
         results = error.response?.data;
      });

   return results;
});
export const userUpdate = createAsyncThunk('user', async (data) => {
   return data;
});
export default createSlice({
   name: 'user',
   initialState: {
      info: {},
      setting: {},
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(userLogin.fulfilled, (state, action) => {
         state.info = action.payload;
      });
   },
});
