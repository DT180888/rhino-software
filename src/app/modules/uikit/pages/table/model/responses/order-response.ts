import { PaymentsResponse } from './payment-response';
import { SubscriptionResponse } from './subscription-response';

export interface OrderResponse {
  id: string;
  orderDetailID: string;
  totalPrice: number;
  totalEmployees: number;
  totalDevices: number;
  basePrice: number;
  orderType: string;
  orderStatus: string;
  addonQuantity: number;
  code: string;
  companyName: string;
  startDate: Date;
  endDate: Date;
  subscription: SubscriptionResponse;
  payment: PaymentsResponse;
}
