import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
   name: 'category',
   initialState: {
      name: {},
   },
   reducers: {
      categoryDispatch: (state, action) => {
         state.name = action.payload;
      },
   },
});
