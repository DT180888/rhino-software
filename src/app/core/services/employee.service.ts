import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseListResponse, BaseResponse } from '../models/base-response.model';
import { EmployeeResponse } from 'src/app/modules/uikit/pages/table/model/responses/employee-response';
import { EmployeeDetailResponse } from 'src/app/modules/uikit/pages/table/model/responses/employee-detail-response';
import { EmployeeCreateOrUpdateRequest } from 'src/app/modules/uikit/pages/table/model/requests/employee-create-or-update-request';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private baseUrl = `${environment.BACKEND_API_URL}/api/employees`;
  constructor(private http: HttpClient) {}

  getEmployees(
    companyId: string,
    pageNumber: number = 1,
    pageSize: number = 10,
    sortBy: string = 'EmployeeName',
    sortDirection: string = 'asc',
    searchTerm: string = ''
  ): Observable<BaseListResponse<EmployeeResponse>> {
    const params = new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('sortBy', sortBy)
        .set('sortDirection', sortDirection)
        .set('searchTerm', searchTerm);
    return this.http.get<BaseListResponse<EmployeeResponse>>(`${this.baseUrl}/company/${companyId}`, { params });
  }

  getEmployeeById(id: string): Observable<BaseResponse<EmployeeDetailResponse>> {
    return this.http.get<BaseResponse<EmployeeDetailResponse>>(`${this.baseUrl}/${id}`);
  }

  createEmployee(request: EmployeeCreateOrUpdateRequest): Observable<BaseResponse<EmployeeDetailResponse>> {
    return this.http.post<BaseResponse<EmployeeDetailResponse>>(this.baseUrl, request);
  }

  updateEmployee(id: string, request: EmployeeCreateOrUpdateRequest): Observable<BaseResponse<EmployeeDetailResponse>> {
    return this.http.put<BaseResponse<EmployeeDetailResponse>>(`${this.baseUrl}/${id}`, request);
  }

  deleteEmployee(id: string): Observable<BaseResponse<string>> {
    return this.http.delete<BaseResponse<string>>(`${this.baseUrl}/${id}`);
  }
}
