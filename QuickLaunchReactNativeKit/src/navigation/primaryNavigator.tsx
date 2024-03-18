/**
 * The primary navigator is used for the "main"
 * navigation flow which the user will use once logged in.
 * This has option to choose between bottom tab and drawer.
 */
import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import TabNavigator from './tabNavigator';
import DrawerNavigator from './drawerNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {settings} from '../../settings';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 */
export type PrimaryParamList = {
  home: undefined;
  settings: undefined;
};

/**
 * This types allows TypeScript to know what navigation and routes are defined
 * for screen props.
 */
export type PrimaryScreenProps<T extends keyof PrimaryParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<PrimaryParamList, T>,
    DrawerScreenProps<PrimaryParamList, T>
  >;

const PrimaryNavigator = () => {
  if (settings.primaryNavigationType == 'drawer') {
    return <DrawerNavigator />;
  } else {
    return <TabNavigator />;
  }
};

export default PrimaryNavigator;
