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
  },
};
