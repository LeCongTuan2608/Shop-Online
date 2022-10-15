import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../Slide/UserSlide';
import categorySlice from '../Slide/CategorySlide';

const rootReducer = {
   user: userSlice.reducer,
   category: categorySlice.reducer,
};
const store = configureStore({
   reducer: rootReducer,
});
export default store;
