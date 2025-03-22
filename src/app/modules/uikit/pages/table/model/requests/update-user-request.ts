export interface UpdateUserRequest {
    personName: string;
    email: string;
    dateOfBirth?: Date;
    gender?: string;
    phoneNumber?: string;
    address?: string;
  }