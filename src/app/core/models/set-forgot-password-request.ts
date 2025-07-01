export interface SetForgotPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}
