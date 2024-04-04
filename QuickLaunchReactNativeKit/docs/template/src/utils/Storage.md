# Storage Management

This module provides functions for managing storage in React Native applications. It includes operations for AsyncStorage and Keychain to store and retrieve data securely.

## Usage

Import the necessary modules:

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
```

### AsyncStorage Operations

#### Get a String from Storage

```javascript
async function getStringFromAsync(key: string): Promise<string | null>
```

#### Set a String to Storage

```javascript
async function setStringToAsync(key: string, value: string): Promise<boolean>
```

#### Get JSON from Storage

```javascript
async function getFromAsync(key: string): Promise<unknown | null>
```

#### Set JSON to Storage

```javascript
async function setToAsync(key: string, value: unknown): Promise<boolean>
```

#### Remove from Storage

```javascript
async function removeFromAsync(key: string): Promise<void>
```

#### Clear Storage

```javascript
async function clearAsync(): Promise<void>
```

### Keychain Operations

#### Get User Credentials from Keychain

```javascript
async function getGenericPasswordFromKeychain(): Promise<UserCredentials | null>
```

#### Set User Credentials to Keychain

```javascript
async function setGenericPasswordToKeychain(username: string, password: string): Promise<boolean>
```

#### Reset User Credentials from Keychain

```javascript
async function resetGenericPasswordFromKeychain(): Promise<boolean>
```

#### Clear Keystore Password

```javascript
async function clearKeystorePassword(): Promise<void>
```

## Example

```javascript
// Usage examples
import {getStringFromAsync, setStringToAsync} from 'utils/storage';

// Get string from storage
const storedString = await getStringFromAsync('myKey');

// Set string to storage
await setStringToAsync('myKey', 'myValue');
```

These functions provide convenient ways to manage storage in React Native applications, ensuring data persistence and security. They can be used to store user preferences, authentication tokens, or any other application data. Ensure sensitive data is stored securely, especially when using Keychain for storing passwords.
