# Navigation

We use [React Navigation v6](https://reactnavigation.org/docs/getting-started/) in the current version of QuickLaunchReactNativeKit. You'll find any navigators in `./src/navigation`, with the `appNavigator.tsx` being the primary one.

There's also a `navigationUtilities.tsx` file which provides some utility functions we find useful in building apps, such as `getActiveRouteName`, `navigate` and `replaceLastNScreens`.

## Usage

To navigate between different screens, you can utilize the Navigation API as follows:

```tsx
navigation.navigate('settings');
```

## Primary Navigation Types

When setting up QuickLaunchReactNativeKit, you'll be prompted to choose between two primary navigation types: Tab or Drawer, depending on your app's structure.

### Option 1: Tab Navigation

Inside `./src/navigation/tabNavigator.tsx` you'll see the definition of the bottom tab navigator. This is where you can customize the style and behavior of the tab bar itself, along with each individual tab.

For detailed information, refer to the **[official documentation](https://reactnavigation.org/docs/bottom-tab-navigator/)**.

### Option 2: Drawer Navigation

Inside `./src/navigation/drawerNavigator.tsx` you'll see the definition of the Drawer navigator. This is where you can customize the style and behavior of the Drawer menu itself, along with DrawerItems.

For detailed information, refer to the **[official documentation](https://reactnavigation.org/docs/drawer-navigator)**

### Screenshots

| Tab Navigation                                                                      | Drawer Navigation                                                                |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| <img alt="bottom-tabs" src="../../../screenshots/home-with-tabs.png" width="220" /> | <img alt="drawer-menu" src="../../../screenshots/drawer-menu.png" width="220" /> |
