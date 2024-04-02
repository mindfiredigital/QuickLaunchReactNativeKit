# WebViewApp

The `WebViewApp` component is used for displaying a web page using WebView.

```tsx
import React from "react";
import { WebViewApp } from "./path/to/WebViewApp";
import { View, StyleSheet } from "react-native";

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <WebViewApp
        source={{ uri: "https://example.com" }}
        onError={(event) => console.error("WebView error:", event.nativeEvent)}
        renderLoading={() => <Spinner loading />}
        style={styles.webView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default MyComponent;
```

## Props

| Prop                  | Type                                                                  | Description                                                             |
| --------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `source`              | `any`                                                                 | The source of the web page to display.                                  |
| `onError`             | `(event: ErrorEvent) => void`                                         | Callback function invoked when an error occurs.                         |
| `onLoad`              | `() => void`                                                          | Callback function invoked when the web view finishes loading.           |
| `onLoadEnd`           | `() => void`                                                          | Callback function invoked when the loading of the web view is finished. |
| `onLoadStart`         | `() => void`                                                          | Callback function invoked when the loading of the web view starts.      |
| `renderError`         | `(errorDomain: string, errorCode: number, errorDesc: string) => void` | Function to render custom error page when loading fails.                |
| `renderLoading`       | `() => ReactNode`                                                     | Function to render custom loading indicator.                            |
| `source`              | `WebViewSourceUri \| WebViewSourceHtml \| WebViewSourceRequireModule` | The source of the web page to display.                                  |
| `startInLoadingState` | `boolean`                                                             | Determines whether the web view starts in the loading state.            |
| `style`               | `StyleProp<ViewStyle>`                                                | Style overrides for the web view container.                             |
