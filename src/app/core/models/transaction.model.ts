export interface TransactionResponse {
  id: string;
  amount: number;
  userId: string;
  orderId: string;
  orderInfo: string;
  paymentId: string;
  status: 'SUCCESSFUL' | 'FAILED';
  paymentMethod: 'VNPAY' | 'MOMO';
  companyId?: string;
  companyName?: string;
  organizationId?: string;
  organizationName?: string;
}
