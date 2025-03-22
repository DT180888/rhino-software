import { Guid } from 'guid-typescript';

export interface Payment {
  id: Guid;
  amount: number;
  userId: string;
  orderId: string;
  personName: string;
  status: string;
  method: string;
}

export interface CustomPaymentRequest {
  orderId: Guid;
}

export interface PaymentResponse {
  message: string;
  payUrl: string;
}
