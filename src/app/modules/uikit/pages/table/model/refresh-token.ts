export interface RefreshToken {
  token: string;
  userId: string;
  expiryDate: Date;
  isRevoked: boolean;
}
