import React from 'react';
import { Text } from 'react-native';
import '~localization';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '~store/store';
import { MainNavigator } from './navigation/MainNavigator';
import { ToastProvider } from '~utils/ToastProvider';
import { useConnectionListener } from '~utils/ConnectionListener';
import { BottomNotificationProvider } from '~utils/BottomNotificationProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// const { SplashScreen } = NativeModules;

function App(): React.JSX.Element {
  useConnectionListener();
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (Platform.OS === 'android') { // handle android splash screen native
  //       SplashScreen.hide();
  //     }
  //   }, 500);
  // }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ToastProvider>
          <BottomNotificationProvider>
            <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
              <GestureHandlerRootView>
                <MainNavigator />
              </GestureHandlerRootView>
            </PersistGate>
          </BottomNotificationProvider>
        </ToastProvider>
      </SafeAreaProvider>
    </Provider>
  );
}


export default App;
