import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from '../models/base-response.model';
import { Organization } from '../models/organization.model';
import { Guid } from 'guid-typescript';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  private apiUrl = `${environment.BACKEND_API_URL}/api/organizations`;

  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<BaseResponse<Organization[]>> {
    return this.http.get<BaseResponse<Organization[]>>(this.apiUrl);
  }

  getOrganization(id: Guid): Observable<BaseResponse<Organization>> {
    return this.http.get<BaseResponse<Organization>>(`${this.apiUrl}/${id}`);
  }

  createOrganization(organization: Organization): Observable<BaseResponse<Organization>> {
    return this.http.post<BaseResponse<Organization>>(this.apiUrl, organization);
  }

  updateOrganization(id: Guid, organization: Organization): Observable<BaseResponse<Organization>> {
    return this.http.put<BaseResponse<Organization>>(`${this.apiUrl}/${id}`, organization);
  }

  deleteOrganization(id: Guid): Observable<BaseResponse<Organization>> {
    return this.http.delete<BaseResponse<Organization>>(`${this.apiUrl}/${id}`);
  }

  getOrganizationById(id: Guid): Observable<BaseResponse<Organization>> {
    return this.http.get<BaseResponse<Organization>>(`${this.apiUrl}/${id}`);
  }
}
