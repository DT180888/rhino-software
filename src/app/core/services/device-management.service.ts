import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/base-response.model';
import { Device } from 'src/app/modules/dashboard/models/device.model';
import {
  AssignDeviceBatchRequest,
  CreateOrUpdateDeviceRequest,
} from 'src/app/modules/dashboard/models/requests/device-requests.model';
import { BasePagedResponse } from '../models/paged-response.model';
import { Gate } from 'src/app/modules/dashboard/models/gate.model';
import { DevicePagedRequest } from 'src/app/modules/dashboard/models/requests/device-paged-requests.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceManagementService {
  private apiUrl = `${environment.BACKEND_API_URL}/api/devices`;

  constructor(private http: HttpClient) { }

  getAllDevices(): Observable<BaseResponse<Device[]>> {
    return this.http.get<BaseResponse<Device[]>>(this.apiUrl);
  }

  getDeviceById(id: string): Observable<BaseResponse<Device>> {
    return this.http.get<BaseResponse<Device>>(`${this.apiUrl}/${id}`);
  }

  getAvailableGates(): Observable<BaseResponse<Gate[]>> {
    return this.http.get<BaseResponse<Gate[]>>(`${this.apiUrl}/gate`);
  }

  createDevice(device: CreateOrUpdateDeviceRequest): Observable<BaseResponse<Device>> {
    return this.http.post<BaseResponse<Device>>(this.apiUrl, device);
  }

  updateDevice(id: string, device: CreateOrUpdateDeviceRequest): Observable<BaseResponse<Device>> {
    return this.http.put<BaseResponse<Device>>(`${this.apiUrl}/${id}`, device);
  }

  deleteDevice(id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.apiUrl}/${id}`);
  }

  assignDevicesToGate(deviceId: string, assignments: AssignDeviceBatchRequest[]): Observable<BaseResponse<Device>> {
    return this.http.post<BaseResponse<Device>>(`${this.apiUrl}/${deviceId}/batch`, assignments);
  }

  getPagedDevices(params: DevicePagedRequest): Observable<BasePagedResponse<Device[]>> {
    let httpParams = new HttpParams()
      .set('pageIndex', params.pageIndex.toString())
      .set('pageSize', params.pageSize.toString());

    if (params.searchTerm) {
      httpParams = httpParams.set('searchTerm', params.searchTerm);
    }

    if (params.sortColumn) {
      httpParams = httpParams.set('sortColumn', params.sortColumn);
    }

    if (params.sortDirection) {
      httpParams = httpParams.set('sortDirection', params.sortDirection);
    }

    return this.http.get<BasePagedResponse<Device[]>>(`${this.apiUrl}/paged`, { params: httpParams });
}
}
