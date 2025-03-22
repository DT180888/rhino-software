import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BasePagedResponse } from '../models/paged-response.model';
import { RoomPagedRequest, RoomRequest, RoomResponse } from '../models/room.model';
import { BaseResponse } from '../models/base-response.model';
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private apiUrl = `${environment.BACKEND_API_URL}/api/rooms`;

    constructor(private http: HttpClient) { }

    getRooms(params: RoomPagedRequest): Observable<BasePagedResponse<RoomResponse[]>> {
        let httpParams = new HttpParams()
            .set('pageNumber', params.pageNumber.toString())
            .set('pageSize', params.pageSize.toString());

        if (params.searchTerm) {
            httpParams = httpParams.set('searchTerm', params.searchTerm);
        }

        if (params.sortBy) {
            httpParams = httpParams.set('sortBy', params.sortBy);
        }

        if (params.sortDirection) {
            httpParams = httpParams.set('sortDirection', params.sortDirection);
        }

        return this.http.get<BasePagedResponse<RoomResponse[]>>(
            `${this.apiUrl}/company/${params.companyId}`,
            { params: httpParams }
        );
    }

    getRoomById(id: Guid): Observable<BaseResponse<RoomResponse>> {
        return this.http.get<BaseResponse<RoomResponse>>(`${this.apiUrl}/${id}`);
    }

    createRoom(room: RoomRequest): Observable<BaseResponse<RoomResponse>> {
        console.log('Sending to backend:', JSON.stringify(room));
        return this.http.post<BaseResponse<RoomResponse>>(this.apiUrl, room);
    }

    updateRoom(id: Guid, room: RoomRequest): Observable<BaseResponse<RoomResponse>> {
        return this.http.put<BaseResponse<RoomResponse>>(`${this.apiUrl}/${id}`, room);
    }

    deleteRoom(id: Guid): Observable<BaseResponse<boolean>> {
        return this.http.delete<BaseResponse<boolean>>(`${this.apiUrl}/${id}`);
    }
}
