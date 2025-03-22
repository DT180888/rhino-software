import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseListResponse, BaseResponse } from '../models/base-response.model';
import { Company } from '../models/company.model';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = `${environment.BACKEND_API_URL}/api/companies`;

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<BaseResponse<Company[]>> {
    return this.http.get<BaseResponse<Company[]>>(this.apiUrl);
  }

  createCompany(company: Company): Observable<BaseResponse<Company>> {
    return this.http.post<BaseResponse<Company>>(this.apiUrl, company);
  }

  updateCompany(id: Guid, company: Company): Observable<BaseResponse<Company>> {
    return this.http.put<BaseResponse<Company>>(`${this.apiUrl}/${id}`, company);
  }

  deleteCompany(id: Guid): Observable<BaseResponse<Company>> {
    return this.http.delete<BaseResponse<Company>>(`${this.apiUrl}/${id}`);
  }

  getCompanyById(id: Guid): Observable<BaseResponse<Company>> {
    return this.http.get<BaseResponse<Company>>(`${this.apiUrl}/${id}`);
  }

  getCompanyByOrganizationId(organizationId: Guid): Observable<BaseResponse<Company[]>> {
    return this.http.get<BaseResponse<Company[]>>(`${this.apiUrl}/${organizationId}/organization`);
  }

  getPagedCompanies(
    pageIndex: number = 1,
    pageSize: number = 10,
    searchTerm: string = '',
    orderBy: string = '',
  ): Observable<BaseListResponse<Company>> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('searchTerm', searchTerm)
      .set('orderBy', orderBy);

    return this.http.get<BaseListResponse<Company>>(`${this.apiUrl}/paged`, { params });
  }

  getPagedCompaniesByOrganization(
    organizationId: Guid,
    pageIndex: number = 1,
    pageSize: number = 10,
    searchTerm: string = '',
    orderBy: string = '',
  ): Observable<BaseListResponse<Company>> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('searchTerm', searchTerm)
      .set('orderBy', orderBy);

    return this.http.get<BaseListResponse<Company>>(`${this.apiUrl}/organization/${organizationId}/paged`, { params });
  }
  getCompaniesWithExpiringOrders(organizationId: Guid): Observable<BaseResponse<Company[]>> {
    const params = new HttpParams().set('organizationId', organizationId.toString());

    return this.http.get<BaseResponse<Company[]>>(`${this.apiUrl}/expiry`, { params });
  }
}
