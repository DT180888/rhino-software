import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransactionResponse } from '../models/transaction.model';
import { BaseResponse } from '../models/base-response.model';
import { CustomPaymentRequest } from '../models/payment.model'; // Import your custom type

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = `${environment.BACKEND_API_URL}/api/payments`;

  constructor(private http: HttpClient) {}

  createMomoPayment(paymentRequest: CustomPaymentRequest): Observable<{ paymentUrl: string }> {
    return this.http.post<{ paymentUrl: string }>(`${this.apiUrl}/momo`, paymentRequest);
  }

  createVnpayPayment(paymentRequest: CustomPaymentRequest): Observable<{ paymentUrl: string }> {
    return this.http.post<{ paymentUrl: string }>(`${this.apiUrl}/vnpay`, paymentRequest);
  }

  processPaymentCallback(queryParams: string): Observable<BaseResponse<TransactionResponse>> {
    return this.http.get<BaseResponse<TransactionResponse>>(`${this.apiUrl}/callback?${queryParams}`);
  }

  retryPayment(orderId: string, paymentMethod: 'VNPAY' | 'MOMO'): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.apiUrl}/retry/${orderId}?paymentMethod=${paymentMethod}`, {});
  }
}
