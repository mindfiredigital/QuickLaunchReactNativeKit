# Icon

The `Icon` component is used to render an icon. It supports both image and SVG icons and can be wrapped in a `TouchableOpacity` for pressable behavior.

```tsx
{
  /** Image icon */
}
<Icon
  icon="exampleImage"
  color={Colors.primary}
  size={30}
  style={styles.icon}
  onPress={handleIconPress}
/>;

{
  /** SVG icon */
}
<Icon
  icon={<MySVGIcon />}
  color={Colors.secondary}
  size={40}
  style={styles.icon}
  onPress={handleIconPress}
/>;
```

## Props

| Prop       | Description                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------ |
| icon       | The name of the icon or a React JSX Element representing the icon.                               |
| color      | An optional tint color for the icon.                                                             |
| size       | An optional size for the icon. If not provided, the icon will be sized to the icon's resolution. |
| imageStyle | Style overrides for the icon image.                                                              |
| svgStyle   | Style overrides for the icon SVG.                                                                |
| style      | Style overrides for the icon container.                                                          |
| onPress    | An optional function to be called when the icon is pressed.                                      |
