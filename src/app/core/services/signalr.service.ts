import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalRHubUrl + '/accessLogHub', {
        // Nếu dùng token để xác thực, có thể thêm accessTokenFactory:
        // accessTokenFactory: () => localStorage.getItem('token') || ''
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.error('Error while starting SignalR connection: ', err));
  }

  public addAccessLogListener(callback: (data: any) => void): void {
    this.hubConnection.on('ReceiveAccessLog', (data) => {
      callback(data);
    });
  }
}
