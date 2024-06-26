/**
 * API endpoints for the app.
 */
export const endPoints = {
  /** Endpoints for authentication. */
  auth: {
    /** Endpoint for user login. */
    logIn: 'auth/login',
    /** Endpoint for user sign-up. */
    signUp: 'auth/sign_up',
    /** Endpoint for forgot password. */
    forgotPassword: 'auth/password/forgot',
    /** Endpoint for otp verification. */
    otpVerification: 'auth/password/verification/otp',
    /** Endpoint for reset password. */
    passwordReset: 'auth/password/reset',
    /** Endpoint for sign-up with social accounts */
    socialSignUp: 'auth/social/signup',
    /** Endpoint for login with social accounts */
    socialLogIn: 'auth/social/login',
    /** Endpoint for get user details. */
    getUser: 'user',
    /** Endpoint for update user details. */
    updateUser: 'user/create-update',
  },
  /** Endpoints for app. */
  app: {
    uploadProfileImage: 'user/upload/profileImage',
    /** Change user password */
    changePassword: 'user/password/change',
  },
};
