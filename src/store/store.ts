import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer, PersistState} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './rootReducer';
import Config from 'react-native-config';

const loggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
    console.log('%c Dispatching:', 'color: grey', action);
    const result = next(action);
    console.log('%c Next state:', 'color: green', storeAPI.getState());
    return result;
};

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [],
    transforms: [],
};
type RootReducerState = ReturnType<typeof rootReducer> & {
    _persist?: PersistState;
};

const persistedReducer = persistReducer<RootReducerState>(
    persistConfig,
    rootReducer,
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: false,
        });

        if (__DEV__ || Config.ENV === 'development') {
            // __DEV__ is React Native's built-in global for dev mode
            middlewares.push(loggerMiddleware);
        }

        return middlewares;
    },
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
