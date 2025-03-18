import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';
import { BaseListResponse, BaseResponse } from 'src/app/core/models/base-response.model';
import { EmployeeFaceResponse } from 'src/app/modules/uikit/pages/table/model/responses/employee-face-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFaceService {
  private baseUrl = `${environment.BACKEND_API_URL}/api/employee-faces`;

  constructor(private http: HttpClient) {}

  /**
   * Get all employee faces with paging
   */
  getAllEmployeeFaceResponsesPaging(
    pageNumber: number,
    pageSize: number,
    sortColumn: string,
    sortDescending: boolean,
    status: string | null,
    validFrom: Date | null,
    validTo: Date | null,
    employeeID: Guid | null
  ): Observable<BaseListResponse<EmployeeFaceResponse>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortColumn', sortColumn)
      .set('sortDescending', sortDescending.toString());

    if (status) {
      params = params.set('status', status);
    }

    if (validFrom) {
      params = params.set('validFrom', validFrom.toISOString());
    }

    if (validTo) {
      params = params.set('validTo', validTo.toISOString());
    }

    if (employeeID) {
      params = params.set('employeeID', employeeID.toString());
    }

    return this.http.get<BaseListResponse<EmployeeFaceResponse>>(this.baseUrl, { params });
  }

  /**
   * Get employee faces by employee ID
   */
  getEmployeeFaceResponses(employeeId: Guid): Observable<BaseResponse<EmployeeFaceResponse[]>> {
    return this.http.get<BaseResponse<EmployeeFaceResponse[]>>(`${this.baseUrl}/${employeeId}`);
  }

  /**
   * Get employee faces status
   */
  getEmployeeFaceResponsesStatus(employeeId: Guid): Observable<BaseResponse<EmployeeFaceResponse>> {
    return this.http.get<BaseResponse<EmployeeFaceResponse>>(`${this.baseUrl}/${employeeId}/status`);
  }

  /**
   * Upload employee faces
   */
  uploadEmployeeFaceResponses(employeeId: Guid, request: EmployeeFaceResponse): Observable<BaseResponse<EmployeeFaceResponse[]>> {
    const formData = new FormData();

    if (request.faceImageURL) {
      for (const image of request.faceImageURL) {
        formData.append('faceImages', image);
      }
    }

    return this.http.post<BaseResponse<EmployeeFaceResponse[]>>(`${this.baseUrl}/${employeeId}/upload`, formData);
  }

  /**
   * Update face status
   */
  updateFaceStatus(faceId: Guid, status: string): Observable<BaseResponse<EmployeeFaceResponse>> {
    return this.http.put<BaseResponse<EmployeeFaceResponse>>(`${this.baseUrl}/${faceId}/status`, { status });
  }

  /**
   * Approve or decline employee faces
   */
  approveOrDeclineEmployeeFaces(employeeId: Guid, request: { status: string }): Observable<BaseResponse<EmployeeFaceResponse[]>> {
    return this.http.post<BaseResponse<EmployeeFaceResponse[]>>(`${this.baseUrl}/${employeeId}/approval`, request);
  }
}