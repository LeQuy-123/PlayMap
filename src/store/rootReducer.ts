import {combineReducers} from '@reduxjs/toolkit';
import lendingReducer from './slices/lendingSlice';

const rootReducer = combineReducers({
  lending: lendingReducer,
});

export default rootReducer;
