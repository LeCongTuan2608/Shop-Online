import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Auth/UserSlide';
import categoryReducer from '../Auth/CategorySlide';

const rootReducer = {
   user: userReducer,
   category: categoryReducer,
};
const store = configureStore({
   reducer: rootReducer,
});
export default store;
