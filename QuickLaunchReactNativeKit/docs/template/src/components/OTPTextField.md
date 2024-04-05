# OTPTextField

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
