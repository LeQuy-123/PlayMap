import React, {useEffect} from 'react';
import {Text} from 'react-native';
import '~localization';
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppDispatch, persistor, store} from '~store/store';
import {MainNavigator} from './navigation/MainNavigator';
import {ToastProvider} from '~utils/ToastProvider';
import {useConnectionListener} from '~utils/ConnectionListener';
import {BottomNotificationProvider} from '~utils/BottomNotificationProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {fetchSports} from '~store/slices/sportSlice';
// const { SplashScreen } = NativeModules;

const AppInit = ({children}: {children: React.ReactNode}) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const init = async () => {
            try {
                await dispatch(fetchSports()).unwrap();
            } catch (err) {
                console.error('Failed to load metadata:', err);
            } finally {
                // SplashScreen.hide(); // only hide when ready
            }
        };
        init();
    }, []);

    return <>{children}</>;
};
function App(): React.JSX.Element {
    useConnectionListener();
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <ToastProvider>
                    <BottomNotificationProvider>
                        <PersistGate
                            loading={<Text>Loading...</Text>}
                            persistor={persistor}>
                            <GestureHandlerRootView>
                                <AppInit>
                                    <MainNavigator />
                                </AppInit>
                            </GestureHandlerRootView>
                        </PersistGate>
                    </BottomNotificationProvider>
                </ToastProvider>
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;
