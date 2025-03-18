export interface Users {
  userId?: string;
  isSucceed?: boolean;
  personName?: string;
  email: string;
  password?: string;
  dob?: Date | null;
  gender?: string;
  phoneNumber?: string;
  role?: string;
  reatedDate?: Date;
  createdBy?: string;
  lastUpdatedBy?: string;
  lastUpdatedDate?: Date;
  isActived?: boolean;
  address?: string;
  token: string;
  refreshToken: string;
  expiration: Date;
}
