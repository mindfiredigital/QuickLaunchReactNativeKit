import {
  CommonActions,
  NavigationState,
  PartialState,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {AuthParamList, PrimaryParamList} from 'navigation';

/**
 * Reference to the root App Navigator.
 *
 * If needed, you can use this to access the navigation object outside of a
 * `NavigationContainer` context. However, it's recommended to use the `useNavigation` hook whenever possible.
 * @see [Navigating Without Navigation Prop]{@link https://reactnavigation.org/docs/navigating-without-navigation-prop/}
 *
 * The types on this reference will only let you reference top level navigators. If you have
 * nested navigators, you'll need to use the `useNavigation` with the stack navigator's ParamList type.
 */
export const navigationRef = createNavigationContainerRef<PrimaryParamList>();

/**
 * use this to navigate without the navigation
 * prop. If you have access to the navigation prop, do not use this.
 * @see {@link https://reactnavigation.org/docs/navigating-without-navigation-prop/}
 * @param {unknown} name - The name of the route to navigate to.
 * @param {unknown} params - The params to pass to the route.
 */
export const navigate = (name: unknown, params?: unknown) => {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name as never, params as never);
  }
};

/**
 * Replaces the last N screens in the navigation stack with a new screen.
 * @param {string} name - The name of the route to replace the last N screens with.
 * @param {number} replaceN - The number of screens to replace. Defaults to 2.
 * @param {any} params - The params to pass to the new route.
 */
export const replaceLastNScreens = (
  name: string,
  replaceN: number = 2,
  params?: any,
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(state => {
      // Remove the last 2 routes from current list of routes
      const routes = state.routes.slice(0, -replaceN);
      routes.push({name, params, key: name});

      // Reset the state to the new state with updated list of routes
      const newState = CommonActions.reset({
        ...state,
        index: routes.length - 1,
        routes,
      });

      return newState;
    });
  }
};

/**
 * Gets the current screen from any navigation state.
 * @param {NavigationState | PartialState<NavigationState>} state - The navigation state to traverse.
 * @returns {string} - The name of the current screen.
 */
export function getActiveRouteName(state: NavigationState | PartialState<NavigationState>): string {
  const route = state.routes[state.index ?? 0]

  // Found the active route -- return the name
  if (!route.state) return route.name as keyof AuthParamList | keyof PrimaryParamList

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state as NavigationState<AuthParamList | PrimaryParamList>)
}
