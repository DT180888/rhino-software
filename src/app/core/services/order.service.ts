import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order, OrderRequest } from '../models/order.model';
import { BaseListResponse, BaseResponse } from '../models/base-response.model';
import { OrderResponse } from 'src/app/modules/uikit/pages/table/model/responses/order-response';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.BACKEND_API_URL}/api/orders`;

  constructor(private http: HttpClient) {}

  createOrder(order: OrderRequest): Observable<BaseResponse<any>> {
    return this.http.post<BaseResponse<any>>(this.apiUrl, order);
  }

  getOrderById(orderId: string): Observable<BaseResponse<Order>> {
    return this.http.get<BaseResponse<Order>>(`${this.apiUrl}/${orderId}`);
  }

  getOrdersByUserId(userId: string): Observable<BaseResponse<Order[]>> {
    return this.http.get<BaseResponse<Order[]>>(`${this.apiUrl}/user/${userId}`);
  }

  getPagedOrders(
    pageIndex: number,
    pageSize: number,
    searchTerm: string = '',
    orderBy: string = '',
  ): Observable<BaseResponse<Order[]>> {
    return this.http.get<BaseResponse<Order[]>>(
      `${this.apiUrl}/paged?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${searchTerm}&orderBy=${orderBy}`,
    );
  }

  getOrders(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
    searchTerm: string,
  ): Observable<BaseListResponse<OrderResponse>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection)
      .set('searchTerm', searchTerm);

    return this.http.get<BaseListResponse<OrderResponse>>(`${this.apiUrl}/manager`, { params });
  }

  getOrderDetails(id: string): Observable<BaseResponse<OrderResponse>> {
    return this.http.get<BaseResponse<OrderResponse>>(`${this.apiUrl}/manager/${id}`);
  }

  getActiveOrdersByCompanyId(companyId: Guid): Observable<BaseResponse<OrderResponse[]>> {
    return this.http.get<BaseResponse<OrderResponse[]>>(`${this.apiUrl}/${companyId}`);
  }

  getOrdersByUser(
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: string,
    searchTerm: string,
  ): Observable<BaseListResponse<OrderResponse>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection)
      .set('searchTerm', searchTerm);

    return this.http.get<BaseListResponse<OrderResponse>>(`${this.apiUrl}/user`, { params });
  }
}
