export interface LoginResponse {
  personName: string;
  isSucceed: boolean;
  token: string;
  expiration: Date;
  refreshToken: string;
  message: string;
  role?: string;
  userId?: string;
  email: string;
}
