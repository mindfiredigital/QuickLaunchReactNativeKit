import * as React from 'react';

import RootStackNavigator from './navigation/rootStackNavigator';
import { store } from './store/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
        <RootStackNavigator />
    </Provider>
  );
}
