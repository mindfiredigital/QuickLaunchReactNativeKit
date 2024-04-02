# Button

The `Button` component is a customizable button component for React Native applications.

```tsx
<Button
  preset="link"
  btnText={"login"}
  style={[{ paddingVertical: 100 }, { borderRadius: 0 }]}
  onPress={() => Alert.alert("pressed")}
/>
```

## Props

| Prop          | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| btnText       | The text to be displayed on the button.                       |
| preset        | The predefined style preset for the button (default or link). |
| onPress       | Callback function to be executed when the button is pressed.  |
| style         | Style overrides for the button container.                     |
| textStyle     | Style overrides for the button text.                          |
| isDisabled    | Determines whether the button is in a disabled state.         |
| restTextProps | Additional text props for the button text component.          |
| btnIcon       | Additional button props for the button icon component.        |
| btnIconSize   | The size of the icon.                                         |
