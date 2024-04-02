# Header

The `Header` component is used to display a header at the top of a screen. It typically includes a title, left button, and optionally a right button.

```tsx
<Header
  headerText="My Screen"
  onPressLeft={handleLeftPress}
  onPressRight={handleRightPress}
  showLeftBtn={true}
  leftBtnIcon={<Icon icon={<ChevronLeft />} />}
  rightBtnIcon={<Icon icon={<Menu />} />}
/>
```

## Props

| Prop         | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| headerText   | The text to be displayed on top.                                   |
| onPressLeft  | Callback function to be executed when the left button is pressed.  |
| onPressRight | Callback function to be executed when the right button is pressed. |
| style        | Style overrides for the header container.                          |
| textStyle    | Style overrides for the header text.                               |
| showLeftBtn  | Determines whether to show the left button.                        |
| leftBtnIcon  | Additional props for the header left button icon component.        |
| rightBtnIcon | Additional props for the header right button icon component.       |
