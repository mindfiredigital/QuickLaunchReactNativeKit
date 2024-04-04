# Store

In the architecture of QuickLaunchReactNativeKit, state management is facilitated by the powerful combination of **[Redux-Toolkit](https://redux-toolkit.js.org)** and **[Redux-Persist](https://www.npmjs.com/package/redux-persist)**. Redux-Toolkit provides utilities that streamline the Redux development process, while Redux-Persist enables the persistence of Redux state to ensure data integrity across app sessions.

## Root Reducer

Within the Redux setup, the root reducer plays a pivotal role. It oversees the handling of the `RESET_STATE` action, which is crucial for maintaining the security and integrity of sensitive user data. When triggered, this action initiates the removal of pertinent data stored in AsyncStorage, effectively resetting the application state to a clean slate. The root reducer ensures that only essential data, such as the current theme, is preserved, thereby safeguarding user privacy and app functionality.

```typescript
export const rootReducer = (state: any, action: UnknownAction) => {
  if (action.type === RESET_STATE) {
    AsyncStorage.multiRemove(['persist:root', 'persist:auth']);
    state = {
      app: {
        theme: state.app.theme,
      },
    };
  }

  return appReducer(state, action);
};
```

## TypeScript Support

For developers leveraging TypeScript in their projects, QuickLaunchReactNativeKit offers dedicated hooks to enhance development efficiency and code quality. The [useAppDispatch.ts](../../../../src/store/hooks/useAppDispatch.ts) hook facilitates type-safe dispatching of actions, ensuring adherence to defined action interfaces and minimizing runtime errors. Similarly, the [useAppSelector.ts](../../../../src/store/hooks/useAppSelector.ts) hook enables seamless access to specific slices of the Redux state while maintaining strong typing, thereby promoting code readability and maintainability. These TypeScript-specific hooks serve as invaluable tools for harnessing the full potential of QuickLaunchReactNativeKit in type-aware environments.
