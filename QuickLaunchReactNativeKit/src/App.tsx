import React from 'react';
import {DevSettings, NativeModules} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {AppNavigator} from 'navigation';
import {persistor, store} from 'store';
import './i18n/i18n';
import './utils/ignoreWarnings';

// Add options to open/close chrome debugger
if (__DEV__) {
  DevSettings.addMenuItem('Open Chrome Debugger', () => {
    NativeModules.DevSettings.setIsDebuggingRemotely(true);
  });
  DevSettings.addMenuItem('Close Chrome Debugger', () => {
    NativeModules.DevSettings.setIsDebuggingRemotely(false);
  });
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
