export interface ExternalAuthResponse {
    token?: string | null;
    refreshToken?: string | null;
    isSucceed?: boolean;
    errorMessage?: string;
    role?: string;
    userId?: string;
    email?: string;
    requiresPasswordSetup?: boolean;
  }