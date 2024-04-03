# Screen

The `Screen` component provides a consistent layout and behavior for different screen presets. It handles safe area insets, status bar settings, keyboard avoiding behavior, and scrollability based on the preset.

```tsx
<Screen
  backgroundColor={Colors.white}
  statusBarStyle="dark-content"
  loading={false}
  bottomContent={<View style={styles.bottomContent} />}
  safeAreaEdges={["top"]}
  style={styles.screen}
  contentContainerStyle={styles.contentContainer}
  preset="fixed"
>
  {/* Your content goes here */}
</Screen>
```

## Props

| Prop                         | Description                                                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| children                     | Children components.                                                                                                                       |
| bottomContent                | Content to be rendered at the bottom of the screen.                                                                                        |
| style                        | Style for the outer content container useful for padding & margin.                                                                         |
| contentContainerStyle        | Style for the inner content container useful for padding & margin.                                                                         |
| safeAreaEdges                | Override the default edges for the safe area.                                                                                              |
| backgroundColor              | Background color.                                                                                                                          |
| statusBarStyle               | Status bar setting. Defaults to dark.                                                                                                      |
| keyboardOffset               | By how much should we offset the keyboard? Defaults to 0.                                                                                  |
| StatusBarProps               | Pass any additional props directly to the StatusBar component.                                                                             |
| KeyboardAvoidingViewProps    | Pass any additional props directly to the KeyboardAvoidingView component.                                                                  |
| loading                      | Boolean indicating whether to show spinner.                                                                                                |
| preset                       | The preset for the screen component. Can be `'fixed'`, `'scroll'`, or `'auto'`. Defaults to `'fixed'`.                                     |
| keyboardShouldPersistTaps    | Should keyboard persist on screen tap. Defaults to `'handled'`. Only applies to scroll preset.                                             |
| scrollViewProps              | Pass any additional props directly to the ScrollView component. Only applies to scroll preset.                                             |
| scrollEnabledToggleThreshold | Threshold to trigger the automatic disabling/enabling of scroll ability. Defaults to `{ percent: 0.92 }`. Only applies to `'auto'` preset. |
