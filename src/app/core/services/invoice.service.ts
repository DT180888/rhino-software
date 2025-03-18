import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = `${environment.BACKEND_API_URL}/api/invoices`;

  constructor(private http: HttpClient) {}

  downloadInvoice(orderId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/?orderId=${orderId}`, {
      responseType: 'blob',
    });
  }
}
