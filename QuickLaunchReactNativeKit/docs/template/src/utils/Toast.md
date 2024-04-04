# Toast Messages in React Native

This module provides functions for displaying toast messages in React Native applications using the [react-native-toast-message](https://www.npmjs.com/package/react-native-toast-message) library.

## Usage

### Toast Functions

#### `showSuccessToast`

Displays a success toast message.

```typescript
showSuccessToast(props: ShowToastType): void
```

#### `showErrorToast`

Displays an error toast message.

```typescript
showErrorToast(props: ShowToastType): void
```

#### `showInfoToast`

Displays an info toast message.

```typescript
showInfoToast(props: ShowToastType): void
```

#### `showWarningToast`

Displays a warning toast message.

```typescript
showWarningToast(props: ShowToastType): void
```

### Toast Configuration

The appearance of the toast messages can be customized using `toastConfig.ts`.

### Example

```javascript
// Usage examples
import {showSuccessToast, showErrorToast} from 'utils';

// Show success toast
showSuccessToast({message: 'Action completed successfully'});

// Show error toast
showErrorToast({message: 'An error occurred while processing the request'});
```

Toast messages provide a convenient way to communicate with users in response to their actions or system events. These functions allow for displaying different types of toast messages with customizable content and appearance, enhancing the user experience in React Native applications.
