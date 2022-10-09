import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import User from 'API/User';

export const userLogin = createAsyncThunk('user/login', async (data) => {
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
         results = error.response.data;
      });

   return results;
});
const userSlice = createSlice({
   name: 'user',
   initialState: {
      current: {},
      setting: {},
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(userLogin.fulfilled, (state, action) => {
         state.current = action.payload;
      });
   },
});

const { reducer } = userSlice;
export default reducer;
