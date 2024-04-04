# QuickLaunchReactNativeKit Built-in Components

QuickLaunchReactNativeKit comes with some prebuilt, flexible, and customizable components. Unlike most component libraries, it's not built to drop in out of the box, but rather with custom design in mind.

QuickLaunchReactNativeKit works fine with other component libraries, but the built-in component system works the best for custom-designed apps.

### Button

The `Button` component is a customizable button component for React Native applications.

```tsx
<Button
  preset="link"
  btnText={'login'}
  style={[{borderRadius: 0}]}
  onPress={() => Alert.alert('pressed')}
/>
```

**[Full Button Component Documentation](./Button.md)**

### Text

The `Text` component is used for displaying text with customizable styles.

```tsx
<Text size="h1" style={styles.title}>
  Hello World
</Text>
```

**[Full Text Component Documentation](./Text.md)**

### TextField

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

**[Full TextField Component Documentation](./TextField.md)**

### Card

The `Card` component is a simple card component with a shadow and customizable background color.

```tsx
<Card style={styles.card}>{/* Content inside the card */}</Card>
```

**[Full Card Component Documentation](./Card.md)**

### Screen

The `Screen` component provides a consistent layout and behavior for different screen presets. It handles safe area insets, status bar settings, keyboard avoiding behavior, and scrollability based on the preset.

```tsx
<Screen
  backgroundColor={Colors.white}
  statusBarStyle="dark-content"
  loading={false}
  bottomContent={<View style={styles.bottomContent} />}
  safeAreaEdges={['top']}
  style={styles.screen}
  contentContainerStyle={styles.contentContainer}
  preset="fixed">
  {/* Your content goes here */}
</Screen>
```

**[Full Screen Component Documentation](./Screen.md)**

### Header

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

**[Full Header Component Documentation](./Header.md)**

### Icon

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

**[Full Icon Component Documentation](./Icon.md)**

### Spinner

The `Spinner` component displays an animated loading spinner with optional text.

```tsx
<Spinner
  loading={true}
  color={'#FF0000'}
  containerStyle={styles.container}
  spinnerStyle={styles.spinner}
  textStyles={styles.loadingText}
/>
```

**[Full Spinner Component Documentation](./Spinner.md)**

### MenuItem

The `MenuItem` component represents an item in a settings list. It typically includes an icon on the left, the setting name, and a right arrow icon to indicate interaction.

```tsx
<MenuItem
  icon="exampleIcon"
  text="Settings"
  onPress={handleMenuItemPress}
  rightChildren={<Switch />}
/>
```

**[Full MenuItem Component Documentation](./MenuItem.md)**

### OTPTextField

The `OTPTextField` component represents a custom OTP (One-Time Password) input field. It displays a row of input fields for entering OTP.

```tsx
<OTPTextField
  otp={otp}
  setOtp={handleOtpChange}
  error={error}
  size={50}
  spacing={10}
/>
```

**[Full OTPTextField Component Documentation](./OTPTextField.md)**

### Separator

The `Separator` component is a simple horizontal separator with customizable border color.

```tsx
<Separator />
```

**[Full Screen Component Documentation](./Separator.md)**

### WebViewApp

The `WebViewApp` component is used for displaying a web page using WebView.

```tsx
<WebViewApp
  source={{uri: 'https://example.com'}}
  onError={event => console.error('WebView error:', event.nativeEvent)}
  renderLoading={() => <Spinner loading />}
  style={styles.webView}
/>
```

**[Full WebViewApp Component Documentation](./WebViewApp.md)**
