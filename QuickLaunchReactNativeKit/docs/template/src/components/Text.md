# Text

The `Text` component is used for displaying text with customizable styles.

```tsx
<Text size="h1" style={styles.title}>
  Hello World
</Text>
```

## Props

| Prop       | Type                                                                                      | Description                                                 |
| ---------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `text`     | `string`                                                                                  | The text to display if not using `tx` or nested components. |
| `style`    | `StyleProp<TextStyle>`                                                                    | An optional style override useful for padding & margin.     |
| `size`     | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body' \| 'body1' \| 'body2' \| 'error'` | Text size modifier.                                         |
| `children` | `React.ReactNode`                                                                         | Children components.                                        |
