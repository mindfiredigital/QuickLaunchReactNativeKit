import * as React from 'react';
import './i18n/i18n';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/appNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}
