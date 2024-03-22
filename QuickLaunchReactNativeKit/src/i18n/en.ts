const en = {
  common: {
    appName: 'QuickLaunchReactNativeKit',
    success: 'Success',
    error: 'Error',
    info: 'Information',
    warning: 'Warning',
  },
  apiErrors: {
    requestTimeout:
      'Request timed out. Please check your internet connection or try again later.',
    networkError: 'Network error. Please check your internet connection.',
    requestCanceled: 'Request canceled. Please try again or contact support.',
    unauthorizedAccess: 'Unauthorized access. Please log in again.',
    forbiddenAccess:
      'Forbidden. You do not have permission to access this resource.',
    resourceNotFound: 'Resource not found.',
    internalServerError:
      'Internal server error. Please try again later or contact support.',
    unexpectedError: 'Unexpected error occurred. Please try again.',
    badRequest: 'Bad request. Please check your request parameters.',
    appleSignInError: 'Apple Sign in failed!',
    appleSignInCancel: 'User canceled Apple Sign in.',
  },
  login: {
    title: 'Sign in',
    userNamePlaceholder: 'Email or User name',
    passwordPlaceholder: 'Password',
    forgotPassword: 'Forgot Password ?',
    dontHave: `Don't have account ?`,
    signup: 'Sign Up',
    signInWith: 'Or sign in with',
    signInCancelled: 'User cancelled the login flow.',
    inProgress: 'Operation (e.g., sign-in) already in progress.',
    playServicesNotAvailable: 'Play services not available or outdated.',
    defaultError: 'An error occurred during sign-in.',
    signinWithTouchId: 'Sign-in with Touch ID',
    signinWithFaceId: 'Sign-in with Face ID',
    signWithBiometrics: 'Sign-in with Biometrics',
    signinWithFaceIdDis: 'Look directly at the front camera to use face ID',
    signinWithTouchIdDis:
      'Place your finger on the Touch ID sensor to authenticate.',
    signWithBiometricsDis:
      'Place your finger on the Touch ID sensor to authenticate.',
  },
  signUp: {
    iHaveAlready: 'Already have an account ?',
    namePlaceholder: 'Full Name',
    emailPlaceholder: 'Email',
    confirmPassword: 'Confirm Password',
  },
  forgotPassword: {
    title: 'Forgot Password',
    description:
      'Opps. It happens to the best of us. Input your email address to fix the issue.',
    sendOtp: 'Send OTP',
  },
  verifyOTP: {
    title: 'OTP Verification',
    description:
      'Copy the verification code in your authy application to verify this account recovery',
    verifyOTP: 'Verify OTP',
  },
  setNewPassoword: {
    title: 'Set new password',
    description:
      'Enter your new password below and check the hint while setting it.',
    submitPassword: 'Submit password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
  },
  changePassword: {
    title: 'Change Password',
    description:
      'Please enter your new password below. You can refer to the hint while setting it.',
    currentPassword: 'Current Password',
  },
  settings: {
    title: 'Settings',
    account: 'Account',
    other: 'Other',
    app: 'App',
    editProfile: 'Edit Profile',
    changePassword: 'Change Password',
    privacy: 'Privacy',
    logout: 'Logout',
    help: 'Help',
    aboutUs: 'About us',
    deleteAccount: 'Delete Account',
    theme: 'Theme',
    appSettings: 'App Settings',
  },
  home: {
    title: 'Home',
  },
  editProfile: {
    title: 'Profile',
    mobileNumPlaceholder: 'Mobile Number',
    save: 'Save',
    editProfilePicture: 'Edit Profile Picture',
    editProfilePictureDesc: 'Choose the options:',
  },
  imageUpload: {
    takePhoto: 'Take Photo',
    choosePhoto: 'Choose Photo',
    cancel: 'Cancel',
    openSetting: 'Open Setting',
    ok: 'Ok',
  },
};

export default en;
