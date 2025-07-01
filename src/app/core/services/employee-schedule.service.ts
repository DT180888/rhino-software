import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateEmployeeScheduleRequest, EmployeeSchedule, UpdateEmployeeScheduleRequest } from '../models/employee-schedule.model';
import { BaseResponse } from '../models/base-response.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeScheduleService {
    private apiUrl = `${environment.BACKEND_API_URL}/api/employee-schedules`;

    constructor(private http: HttpClient) { }

    createBatch(requests: CreateEmployeeScheduleRequest[]): Observable<BaseResponse<EmployeeSchedule[]>> {
        return this.http.post<BaseResponse<EmployeeSchedule[]>>(`${this.apiUrl}/batch`, requests);
    }

    update(scheduleId: string, request: UpdateEmployeeScheduleRequest): Observable<BaseResponse<EmployeeSchedule>> {
        return this.http.put<BaseResponse<EmployeeSchedule>>(`${this.apiUrl}/${scheduleId}`, request);
    }

    getById(scheduleId: string): Observable<BaseResponse<EmployeeSchedule>> {
        return this.http.get<BaseResponse<EmployeeSchedule>>(`${this.apiUrl}/${scheduleId}/customer`);
    }

    delete(scheduleId: string): Observable<BaseResponse<boolean>> {
        return this.http.delete<BaseResponse<boolean>>(`${this.apiUrl}/${scheduleId}`);
    }
}