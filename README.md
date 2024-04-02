# Quick Launch React Native Kit

## Overview

Welcome to QuickLaunchReactNativeKit! This kit is designed to expedite the development process of common React Native projects by providing pre-built frameworks for essential functionalities like login, signup, settings, and more. With QuickLaunchReactNativeKit, developers can seamlessly integrate these features into their projects, saving valuable time and effort. Additionally, this kit offers multiple themes to enhance the aesthetic appeal of your app.

Your new QuickLaunchReactNativeKit project comes equipped with a comprehensive set of libraries, already configured and ready for use. Here's what's included:

- **React Native**: The foundation for building cross-platform mobile applications.
- **React Navigation**: A powerful library for handling navigation in React Native apps.
- **Redux Toolkit**: A Redux library that simplifies state management.
- **Redux Persist**: Enables seamless persistence of Redux state.
- **TypeScript**: Provides type safety and improved code quality.
- **AsyncStorage**: Allows for asynchronous, persistent storage in React Native apps.
- **axios**: A versatile HTTP client for making requests to REST servers.
- **In-app update**: Facilitates seamless updates to your app within the application itself.
- **Dark and Light mode support**: Enhances user experience by offering multiple color themes.
- **Multi-language support**: Enables localization and internationalization of your app.
- **SVG icons support**: Easily integrate scalable vector graphics into your app.
- **Prebuilt UI**: Accelerates development with pre-designed user interface components.
- **Social sign-ins**: Simplifies user authentication with Google and Apple sign-ins.
- **Additional prebuilt [components](./docs/template/src/components/Components.md)**: Explore a variety of pre-built components to enhance your app's UI.

And much more!

### Example Screens

Utilize our pre-built screens to jumpstart your app development:

1. **Authentication**: Simplify user sign-in, sign-up, and password recovery processes.

2. **Settings**: Customize user preferences effortlessly for a personalized experience and account management.

3. **Navigation**: Seamlessly organize app content with tab and drawer views.

Explore all available screens [here](./docs/ScreenShots.md)

With QuickLaunchReactNativeKit, expedite your React Native project and craft exceptional mobile experiences. Happy coding!

## Installation

To get started with QuickLaunchReactNativeKit, follow these steps:

### Prerequisites

- For React Native, make sure you're set up for React Native by following [the official documentation](https://reactnative.dev/docs/environment-setup).
- Ensure you have Node.js LTS release or greater installed.
- Install recent versions of Xcode and Android Studio.
- Recommended: Yarn or npm package manager.
- Recommended: macOS (for iOS development).

### Running the CLI

```bash
# Get walked through the prompts for the different options to start your new app
npx react-native@latest init <ProjectName> --template=https://gitlab.mindfire.co.in/mobilefoss/Foss_RN.git
```

### Post-Install Setup

#### Step 1: Theme Configuration

During setup, you have the option to customize your theme or choose from preset themes.

##### Option 1: Custom Theme Configuration

1. You'll be prompted to define custom theme values.
2. Follow the prompts to input hex color values for each theme property.
3. Upon completion, a custom theme file will be generated successfully.

##### Option 2: Preset Theme Configuration

1. Select a theme from the available options. Refer to the [Theme Section](#themes) for details.
2. The chosen theme will be applied to your project.

#### Step 2: Choose Navigation Type

1. Select your preferred navigation type: Tab or Drawer, as per your app's structure. Refer to the [Navigation Types](#navigation-types) section for more information.
2. Navigation type will be set accordingly.

### Project Initialization Complete

Your React Native project has been generated with the QuickLaunchReactNativeKit template. You're now ready to start development with your chosen theme and navigation type configurations. Follow the instructions displayed in the terminal to seamlessly run your app on both iOS and Android platforms.

## Tech Stack

| Library                                                                                              | Category             | Version  | Description                                                           |
| ---------------------------------------------------------------------------------------------------- | -------------------- | -------- | --------------------------------------------------------------------- |
| [React Native](https://www.npmjs.com/package/react-native)                                           | Mobile Development   | 0.73.6   | A framework for building native apps using React                      |
| [React](https://www.npmjs.com/package/react)                                                         | UI Library           | 18.2.0   | A JavaScript library for building user interfaces                     |
| [Typescript](https://www.npmjs.com/package/typescript)                                               | Development Tools    | 5.0.4    | TypeScript is a language for application scale JavaScript development |
| [Prettier](https://www.npmjs.com/package/prettier)                                                   | Development Tools    | 2.8.8    | Opinionated Code Formatter                                            |
| [React Navigation](https://www.npmjs.com/package/@react-navigation/native)                           | Navigation           | ^6.1.10  | React Native Navigation                                               |
| [React Navigation Native Stack](https://www.npmjs.com/package/@react-navigation/native-stack)        | Navigation           | ^6.9.18  | Stack navigator for React Navigation                                  |
| [React Navigation Bottom Tabs](https://www.npmjs.com/package/@react-navigation/bottom-tabs)          | Navigation           | ^6.5.12  | Bottom tab navigator for React Navigation                             |
| [React Navigation Drawer](https://www.npmjs.com/package/@react-navigation/drawer)                    | Navigation           | ^6.6.7   | Drawer navigator for React Navigation                                 |
| [Async Storage](https://www.npmjs.com/package/@react-native-async-storage/async-storage)             | Storage              | ^1.22.3  | Asynchronous storage system for React Native                          |
| [Axios](https://www.npmjs.com/package/axios)                                                         | HTTP Requests        | ^1.6.7   | Promise based HTTP client for the browser and node.js                 |
| [Redux Toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)                                      | State Management     | ^2.2.0   | Redux Toolkit simplifies Redux state management                       |
| [Redux](https://www.npmjs.com/package/react-redux)                                                   | State Management     | ^9.1.0   | Official React bindings for Redux                                     |
| [Redux Persist](https://www.npmjs.com/package/redux-persist)                                         | State Management     | ^6.0.0   | Persist and rehydrate a Redux store                                   |
| [i18next](https://www.npmjs.com/package/i18next)                                                     | Internationalization | ^23.8.2  | Internationalization framework for JavaScript                         |
| [React i18next](https://www.npmjs.com/package/react-i18next)                                         | Internationalization | ^14.0.5  | Internationalization for React                                        |
| [SVG](https://www.npmjs.com/package/react-native-svg)                                                | Graphics             | ^15.1.0  | SVG library for React Native                                          |
| [SVG Transformer](https://www.npmjs.com/package/react-native-svg-transformer)                        | Build Tool           | ^1.3.0   | Transform SVGs into React Native components                           |
| [Toast Message](https://www.npmjs.com/package/react-native-toast-message)                            | UI Components        | ^2.2.0   | Toast messages for React Native                                       |
| [Webview](https://www.npmjs.com/package/react-native-webview)                                        | UI Components        | ^13.8.2  | WebView component for React Native                                    |
| [In App Updates](https://www.npmjs.com/package/sp-react-native-in-app-updates)                       | Utilities            | ^1.4.0   | React Native in-app updates                                           |
| [Reanimated](https://www.npmjs.com/package/react-native-reanimated)                                  | Animation            | ^3.7.0   | React Native Reanimated library for animations                        |
| [Apple Authentication](https://www.npmjs.com/package/@invertase/react-native-apple-authentication)   | Authentication       | ^2.3.0   | React Native Apple Authentication wrapper                             |
| [Google Signin](https://www.npmjs.com/package/@react-native-google-signin/google-signin)             | Authentication       | ^11.0.0  | Google Sign-In for React Native                                       |
| [Biometrics](https://www.npmjs.com/package/react-native-biometrics)                                  | Authentication       | ^3.0.1   | React Native Biometrics authentication                                |
| [Bootsplash](https://www.npmjs.com/package/react-native-bootsplash)                                  | UI Components        | ^5.4.0   | React Native splash screen                                            |
| [Config](https://www.npmjs.com/package/react-native-config)                                          | Configuration        | ^1.5.1   | Access environment variables in React Native                          |
| [Device Info](https://www.npmjs.com/package/react-native-device-info)                                | Device Information   | ^10.13.1 | Get device information in React Native                                |
| [Image Crop Picker](https://www.npmjs.com/package/react-native-image-crop-picker)                    | Image Processing     | ^0.40.3  | Image cropping and picking in React Native                            |
| [Keychain](https://www.npmjs.com/package/react-native-keychain)                                      | Security             | ^8.2.0   | Keychain access for React Native                                      |
| [Otp Verify](https://www.npmjs.com/package/react-native-otp-verify)                                  | Utilities            | ^1.1.8   | OTP verification for React Native                                     |
| [Segmented Control](https://www.npmjs.com/package/@react-native-segmented-control/segmented-control) | UI Components        | ^2.5.0   | Segmented control component for React Native                          |
| [react-native-gesture-handler](https://www.npmjs.com/package/react-native-gesture-handler)           | UI Components        | ^2.15.0  | Gesture management in React Native                                    |
| [react-native-screens](https://www.npmjs.com/package/react-native-screens)                           | UI Components        | ^3.29.0  | Native navigation primitives for React Native                         |
| [react-native-safe-area-context](https://www.npmjs.com/package/react-native-safe-area-context)       | UI Components        | ^4.9.0   | React Native Safe Area Context                                        |

## Documentation

### Components

[Components](./docs/template/src/components/Components.md) - QuickLaunchReactNativeKit's built-in UI components.

- [Button](./docs/template/src/components/Button.md)
- [Card](./docs/template/src/components/Card.md)
- [Header](./docs/template/src/components/Header.md)
- [Icon](./docs/template/src/components/Icon.md)
- [MenuItem](./docs/template/src/components/MenuItem.md)
- [OTPTextField](./docs/template/src/components/OTPTextField.md)
- [Screen](./docs/template/src/components/Screen.md)
- [Separator](./docs/template/src/components/Separator.md)
- [Spinner](./docs/template/src/components/Spinner.md)
- [Text](./docs/template/src/components/Text.md)
- [TextField](./docs/template/src/components/TextField.md)
- [WebViewApp](./docs/template/src/components/WebViewApp.md)

### Themes

List of available themes:

1. Theme 1
2. Theme 2
3. Theme 3

### Navigation Types

Available navigation types:

- **Tab**: Tab-based navigation system.
- **Drawer**: Drawer-based navigation system.
