import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
   name: 'dashboard',
   initialState: {
      dashboard: false,
   },
   reducers: {
      setDashboard: (state, action) => {
         state.dashboard = action.payload;
      },
   },
});
