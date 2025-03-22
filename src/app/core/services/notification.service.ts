import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseListResponse } from '../models/base-response.model';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/notification.model';

@Injectable({
    providedIn: 'root'
  })
  export class NotificationService {
    private apiUrl = `${environment.BACKEND_API_URL}/api/notifications`;
    constructor(private http: HttpClient) {}

    getAllNotifications(
      pageIndex: number = 1,
      pageSize: number = 10,
      searchTerm: string = ''
    ): Observable<BaseListResponse<Notification>> {
      let params = new HttpParams()
        .set('popup', 'false')
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString());
      if (searchTerm) {
        params = params.set('searchTerm', searchTerm);
      }
      return this.http.get<BaseListResponse<Notification>>(this.apiUrl, { params });
    }

    getPopUpNotifications(): Observable<BaseListResponse<Notification>> {
      const params = new HttpParams().set('popup', 'true');
      return this.http.get<BaseListResponse<Notification>>(this.apiUrl, { params });
    }

    dismissNotifications(): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/dismiss-all`, {});
    }

    markNotificationAsRead(notificationId: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/${notificationId}/read`, {});
    }
  }