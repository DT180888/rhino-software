export interface PaymentsResponse {
    id: string;
    amount: number;
    userId: string;
    orderId: string;
    personName: string;
    status: string;
    method: string;
}