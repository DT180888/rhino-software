import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateUserRequest } from 'src/app/modules/uikit/pages/table/model/requests/update-user-request';
import { UserDetailResponse, UserResponse } from 'src/app/modules/uikit/pages/table/model/responses/user-response';
import { BaseListResponse, BaseResponse } from '../models/base-response.model';
import { UpdateRoleRequest } from 'src/app/modules/uikit/pages/table/model/requests/update-role-request';
import { UpdateRoleResponse } from 'src/app/modules/uikit/pages/table/model/responses/update-role-response';
import { DeleteUserRoleRequest } from 'src/app/modules/uikit/pages/table/model/requests/delete-user-role-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.BACKEND_API_URL}/api/users`;
  constructor(private http: HttpClient) {}
  getUsers(
    pageNumber: number = 1,
    pageSize: number = 10,
    sortBy: string = 'PersonName',
    sortDirection: string = 'asc',
    searchTerm: string = ''
  ): Observable<BaseListResponse<UserResponse>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection)
      .set('searchTerm', searchTerm);
    return this.http.get<BaseListResponse<UserResponse>>(this.baseUrl, { params });
  }

  getUserById(id: string): Observable<BaseResponse<UserDetailResponse>> {
    return this.http.get<BaseResponse<UserDetailResponse>>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: string, updateRequest: UpdateUserRequest): Observable<BaseResponse<boolean>> {
    return this.http.put<BaseResponse<boolean>>(`${this.baseUrl}/${id}`, updateRequest);
  }

  deleteUser(id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.baseUrl}/${id}`);
  }

  updateUserRole(request: UpdateRoleRequest): Observable<UpdateRoleResponse> {
    return this.http.put<UpdateRoleResponse>(`${environment.BACKEND_API_URL}/api/auth/role`, request);
  }

  deleteUserRole(request: DeleteUserRoleRequest): Observable<BaseResponse<boolean>> {
    const url = `${environment.BACKEND_API_URL}/api/users/role`;
    return this.http.put<BaseResponse<boolean>>(url, request);
  }
}