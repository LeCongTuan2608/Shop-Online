import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import User from 'API/User';

export const categoryProduct = createAsyncThunk('category', async (data) => {
   return data;
});
const CategorySlice = createSlice({
   name: 'categoryid',
   initialState: {
      current: {},
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(categoryProduct.fulfilled, (state, action) => {
         state.current = action.payload;
      });
   },
});

const { reducer } = CategorySlice;
export default reducer;
