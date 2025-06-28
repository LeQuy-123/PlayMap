import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import lendingReducer from './slices/lendingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  lending: lendingReducer,
});

export default rootReducer;
