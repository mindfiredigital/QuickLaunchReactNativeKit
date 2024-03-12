/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * The API version of the api.
   */
  apiVersion: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

export interface LoginReq {
  email: string;
  password: string;
}
export interface LoginRes {
  status: string;
  message: string;
  data: UserObj | null;
  error: string;
}
export interface UserObj {
  email: string;
  full_name: string;
  phone_number: string;
  profileSignedUrl: string;
  token: string;
  access_token: string;
  refresh_token: string;
}
export interface SignUpReq {
  email: string;
  password: string;
  confirm_password: string;
  full_name: string;
}
export interface ForgotPasswordReq {
  email: string;
}
export interface OTPVerificationReq {
  code: number;
}
export interface PasswordResetReq {
  password: string;
  confirm_password: string;
}
