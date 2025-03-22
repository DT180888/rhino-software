import { OrderResponse } from './order-response';
import { UserRoleResponse } from './user-role-response';

export interface UserResponse {
    id: string;
    personName: string;
    email: string;
    dateOfBirth?: Date;
    gender?: string;
    phoneNumber?: string;
    address?: string;
  }

  export interface UserDetailResponse extends UserResponse {
    isActive: boolean;
    userRoles: UserRoleResponse[];
    orders: OrderResponse[];
  }