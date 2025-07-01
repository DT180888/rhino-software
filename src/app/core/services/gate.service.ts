import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseListResponse, BaseResponse } from '../models/base-response.model';
import { Gate } from '../models/gate.model';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class GateService {
    private apiUrl = `${environment.BACKEND_API_URL}/api/gates`;

    constructor(private http: HttpClient) { }

    getGatesByRoom(
        roomId: string,
        pageNumber: number = 1,
        pageSize: number = 10,
        sortBy: string = '',
        sortDirection: string = 'asc',
        searchTerm: string = ''
    ): Observable<BaseListResponse<Gate>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
            .set('sortBy', sortBy)
            .set('sortDirection', sortDirection)
            .set('searchTerm', searchTerm);

        return this.http.get<BaseListResponse<Gate>>(`${this.apiUrl}/room/${roomId}`, { params });
    }

    getGateById(id: Guid): Observable<BaseResponse<Gate>> {
        return this.http.get<BaseResponse<Gate>>(`${this.apiUrl}/${id}`);
    }
}