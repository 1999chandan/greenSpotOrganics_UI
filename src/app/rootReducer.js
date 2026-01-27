import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// import other reducers as you implement them

export const rootReducer = combineReducers({
  auth: authReducer,
  // example: exampleReducer, // remove if not needed
});

export default rootReducer;