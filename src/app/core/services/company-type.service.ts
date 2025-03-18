import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/base-response.model';
import { CompanyType } from '../models/company-type.model';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root',
})
export class CompanyTypeService {
  private apiUrl = `${environment.BACKEND_API_URL}/api/company-types`;

  constructor(private http: HttpClient) {}

  getCompanyTypes(): Observable<BaseResponse<CompanyType[]>> {
    return this.http.get<BaseResponse<CompanyType[]>>(this.apiUrl);
  }

  getCompanyTypeById(id: Guid): Observable<BaseResponse<CompanyType>> {
    return this.http.get<BaseResponse<CompanyType>>(`${this.apiUrl}/${id}`);
  }
}
