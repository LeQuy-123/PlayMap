import {combineReducers} from '@reduxjs/toolkit';
// import lendingReducer from './slices/lendingSlice';
import userReducer from './slices/userSlice';
import sportReducer from './slices/sportSlice';

const rootReducer = combineReducers({
    // lending: lendingReducer,
    user: userReducer,
    Sport: sportReducer,
});

export default rootReducer;
