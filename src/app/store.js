import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../Slide/UserSlide';
import categorySlice from '../Slide/CategorySlide';
import DashboardSlice from '../Slide/Dashboard';

const rootReducer = {
   user: userSlice.reducer,
   category: categorySlice.reducer,
   dashboard: DashboardSlice.reducer,
};
const store = configureStore({
   reducer: rootReducer,
});
export default store;
