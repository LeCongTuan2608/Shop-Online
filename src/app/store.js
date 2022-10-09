import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slide/UserSlide';
import categoryReducer from '../Slide/CategorySlide';

const rootReducer = {
   user: userReducer,
   category: categoryReducer,
};
const store = configureStore({
   reducer: rootReducer,
});
export default store;
