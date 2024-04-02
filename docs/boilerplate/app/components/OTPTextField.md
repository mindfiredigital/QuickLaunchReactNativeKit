# OTPTextField

The `OTPTextField` component represents a custom OTP (One-Time Password) input field. It displays a row of input fields for entering OTP.

```tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { OTPTextField } from "./path/to/OTPTextField";
import { Colors } from "../theme";

const MyOTPScreen = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleOtpChange = (text: string) => {
    if (text.length === 6) {
      // Perform validation
      // Example validation
      if (text === "123456") {
        setError("");
      } else {
        setError("Invalid OTP");
      }
    } else {
      setError("");
    }
    setOtp(text);
  };

  return (
    <View style={styles.container}>
      <OTPTextField
        otp={otp}
        setOtp={handleOtpChange}
        error={error}
        size={50}
        spacing={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyOTPScreen;
```

## Props

| Prop                   | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| length                 | Length of the OTP (One-Time Password). Default value is 6.     |
| otp                    | Entered OTP number.                                            |
| setOtp                 | Callback to update the entered OTP.                            |
| size                   | Size of the individual OTP input fields.                       |
| spacing                | Spacing between OTP input fields.                              |
| error                  | Error message to be displayed.                                 |
| containerStyleOverride | Override styles for the container.                             |
| inputStyleOverride     | Override styles for the input fields.                          |
| ...rest                | Other TextInputProps are forwarded to the TextInput component. |
