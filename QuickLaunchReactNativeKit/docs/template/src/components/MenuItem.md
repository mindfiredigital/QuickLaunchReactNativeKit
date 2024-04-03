# MenuItem

The `MenuItem` component represents an item in a settings list. It typically includes an icon on the left, the setting name, and a right arrow icon to indicate interaction.

```tsx
<MenuItem
  icon="exampleIcon"
  text="Settings"
  onPress={handleMenuItemPress}
  rightChildren={<Switch />}
/>
```

## Props

| Prop           | Description                                                                          |
| -------------- | ------------------------------------------------------------------------------------ |
| icon           | The icon to be displayed on the left side of the item.                               |
| text           | The name of the setting to be displayed.                                             |
| leftIconSize   | The size of the left icon. Default value is 24.                                      |
| rightIconSize  | The size of the right arrow icon. Default value is 24.                               |
| rightChildren  | Add custom UI to the right of menu item.                                             |
| bottomChildren | Add custom UI to the bottom of menu item.                                            |
| ...rest        | Other TouchableOpacityProps are forwarded to the TouchableOpacity or View component. |
