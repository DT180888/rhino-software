import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseListResponse, BaseResponse } from '../models/base-response.model';
import { Observable } from 'rxjs';
import { AccessLog } from '../models/access-log.model';

@Injectable({
    providedIn: 'root'
})
export class AccessLogService {
    private apiUrl = `${environment.BACKEND_API_URL}/api/access-logs`;

    constructor(private http: HttpClient) { }

    getAccessLogByGate(
        gateId: string,
        pageNumber: number = 1,
        pageSize: number = 10,
        sortBy: string = '',
        sortDirection: string = 'asc',
        searchTerm: string = ''
    ): Observable<BaseListResponse<AccessLog>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
            .set('sortBy', sortBy)
            .set('sortDirection', sortDirection)
            .set('searchTerm', searchTerm);

        return this.http.get<BaseListResponse<AccessLog>>(`${this.apiUrl}/gate/${gateId}`, { params });
    }

    getAccessLogDetail(accessLogId: string): Observable<BaseResponse<AccessLog>> {
        return this.http.get<BaseResponse<AccessLog>>(`${this.apiUrl}/${accessLogId}`);
      }

    getAccessLogByCompany(
        companyId: string,
        pageNumber: number = 1,
        pageSize: number = 10,
        sortBy: string = '',
        sortDirection: string = 'asc',
        searchTerm: string = ''
    ): Observable<BaseListResponse<AccessLog>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
            .set('sortBy', sortBy)
            .set('sortDirection', sortDirection)
            .set('searchTerm', searchTerm);

        return this.http.get<BaseListResponse<AccessLog>>(`${this.apiUrl}/company/${companyId}`, { params });
    }
}