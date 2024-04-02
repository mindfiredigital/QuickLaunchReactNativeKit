# Spinner

The `Spinner` component displays an animated loading spinner with optional text.

```tsx
<Spinner
  loading={true}
  color={"#FF0000"}
  containerStyle={styles.container}
  spinnerStyle={styles.spinner}
  textStyles={styles.loadingText}
/>
```

## Props

| Prop             | Type                   | Description                                                   |
| ---------------- | ---------------------- | ------------------------------------------------------------- |
| `loading`        | `boolean` (required)   | Indicates whether the spinner should be in the loading state. |
| `color`          | `string`               | The color of the spinner.                                     |
| `containerStyle` | `StyleProp<ViewStyle>` | Optional style for the container wrapping the spinner.        |
| `spinnerStyle`   | `StyleProp<ViewStyle>` | Optional style for the spinner itself.                        |
| `textStyles`     | `StyleProp<TextStyle>` | Optional styles for the text displayed with the spinner.      |
