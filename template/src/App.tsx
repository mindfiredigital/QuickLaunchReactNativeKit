import * as React from 'react';
import './i18n/i18n';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/appNavigator';
import {store} from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
