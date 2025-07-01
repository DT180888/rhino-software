import { Guid } from 'guid-typescript';
import { Subscription } from './subscription.model';

export enum OrderType {
  New = 'NEW',
  Renewal = 'RENEWAL',
  Upgrade = 'UPGRADE',
}

export interface Order {
  id?: Guid;
  userID?: Guid;
  user?: UserDetailResponse;
  subscriptionIds: Guid[];
  subscriptions?: Subscription[];
  totalMaxEmployees?: number;
  totalDevices?: number;
  totalPrice?: number;
  orderStatus?: string;
  code?: string;
  companyId: string;
  organizationId: string;
  companyName: string;
  organizationName: string;
  startDate: Date;
  endDate: Date;
}

export interface OrderRequest {
  subscriptionIDs: Guid[];
  companyId: Guid;
}
export interface UserDetailResponse {
  id: Guid;
  personName: string;
  email: string;
}
