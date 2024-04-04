# TextField

The `TextField` component allows for the entering and editing of text.

```tsx
<TextField
  ref={textInputRef}
  label="Username"
  placeholder="Enter your username"
  leftIcon="user"
  rightIcon="eye"
  onPressRightIcon={() => console.log('Right icon pressed')}
  error="Username is required"
/>
```

## Props

| Prop                | Type                             | Description                                                           |
| ------------------- | -------------------------------- | --------------------------------------------------------------------- |
| `preset`            | `'default' \| 'password'`        | TextFied preset for password type.                                    |
| `status`            | `'error' \| 'disabled'`          | A style modifier for different input states.                          |
| `label`             | `string`                         | The label text to display if not using `labelTx`.                     |
| `placeholder`       | `string`                         | The placeholder text to display if not using `placeholderTx`.         |
| `style`             | `StyleProp<TextStyle>`           | Optional input style override.                                        |
| `containerStyle`    | `StyleProp<ViewStyle>`           | Style overrides for the container.                                    |
| `inputWrapperStyle` | `StyleProp<ViewStyle>`           | Style overrides for the input wrapper.                                |
| `outerWrapper`      | `StyleProp<ViewStyle>`           | Style overrides for the outer wrapper.                                |
| `errorStyle`        | `StyleProp<TextStyle>`           | Style overrides for the error text.                                   |
| `rightIcon`         | `IconTypes \| React.JSX.Element` | The type of icon to be displayed on the right side of the text input. |
| `leftIcon`          | `IconTypes \| React.JSX.Element` | The type of icon to be displayed on the left side of the text input.  |
| `editable`          | `boolean`                        | Determines whether the text input is editable or not.                 |
| `onPressRightIcon`  | `() => void`                     | Callback function to be executed when the right icon is pressed.      |
| `onPressLeftIcon`   | `() => void`                     | Callback function to be executed when the left icon is pressed.       |
| `leftIconSize`      | `number`                         | The size of the left icon.                                            |
| `rightIconSize`     | `number`                         | The size of the right icon.                                           |
| `error`             | `string`                         | Display error string for text input.                                  |
